import React from "react";
import ReactDOM from "react-dom";
import MediaQuery from "react-responsive";

import SuperAgent from "superagent";
import HSData from "../data/HSData.js";

import AppLoaderMessage from "./AppLoaderMessage.jsx";
import CardBrowserMobile from "./CardBrowserMobile.jsx";
import CardBrowserTablet from "./CardBrowserTablet.jsx";
import CardBrowserFull from "./CardBrowserFull.jsx";

import "../css/all.scss";

import { Button } from "react-bootstrap";

const API_URL = "https://omgvamp-hearthstone-v1.p.mashape.com/cards?collectible=1";
const API_CREDS = {"X-Mashape-Key": "oWBWUrFHJJmshIc9h9k1c034BThep1uCZTFjsnNat8Vi3QzlSY"};
const API_OPTIONS = {"Accept": "application/json"};

var hsData = new HSData();

export default class App extends React.Component {

    constructor( props ) {
        super( props );
        
        /* Before setting state, check if localStorage is allowed and, if so, exists. 
            This could probably be written more succinctly. But the whole state 
            carousel should probably be thrown out anyway. 
            JS receives whatever is returned from localStorage as a string, 
            hence the wonky yesno-vars.
        */
        let localDataValue = localStorage.getItem("saveStateLocal");
        let localStorageYesno = false;
            (localDataValue == "remember") ? localStorageYesno = true : localStorageYesno = false;
        let localGoldenValue = localStorage.getItem("preferGoldenCards");
        let goldenCardsYesno = false;
            (localGoldenValue == "showbling") ? goldenCardsYesno = true : goldenCardsYesno = false;

        this.state = {
            allCards: null,
            someCards: null,        // Not currently being used, but kept for future purposes.
            currentCard: null,
            cardHistory: [],
            saveStateLocal: localStorageYesno,
            preferGolden: goldenCardsYesno,
            debugging: false    // Adds some testing utils. Well... Buttons.
        }

        this.handleNavMenuClick = this.handleNavMenuClick.bind(this);
        this.handleRandom = this.handleRandom.bind(this);
        this.changeCurrentCard = this.changeCurrentCard.bind(this);
        this.changeHistory = this.changeHistory.bind(this);

        this.setLocalStorageSettings = this.setLocalStorageSettings.bind(this);
        this.setInitialState = this.setInitialState.bind(this);
        this.handleDebug = this.handleDebug.bind(this);

        this.disableZooming();
    }

    componentDidMount() {
        /* To be honest I have no real reason for choosing the Superagent
        package for this bit. It worked at a time when I had no idea what 
        I was doing and stuck around. */
        SuperAgent.get(API_URL)
                    .set(API_CREDS)
                    .set(API_OPTIONS)
                    .end((error, rawJson) => {
                        if( error ) {
                            console.log(new Error("API Fuckup!"));
                        } else if ( rawJson ) {                
                            let cards = hsData.makeData( rawJson );
                            this.setState({
                                allCards: cards,
                                someCards: cards
                            })
                            this.setInitialState();
                        } else {
                            console.log(new Error("Havoc!"));
                        }
                    });
    }

    setInitialState() {
        let currentCard = hsData.getRandomCard();
        let cardHistory = [];
        let preferGolden = false;
        /* ^^ Sensible defaults if there's no localStorage stuff. */

        if( this.state.saveStateLocal ) {
            let savedCard = JSON.parse(localStorage.getItem("lastCardView"));
            let savedHistory = JSON.parse(localStorage.getItem("lastHistoryState"));
            let savedGoldenPref = localStorage.getItem("preferGoldenCards");
                if(savedCard != null) currentCard = savedCard;
                if(savedHistory != null) cardHistory = savedHistory.slice(0,50); // Why 50? Why not?
                if(savedGoldenPref == "showbling") preferGolden = true;
        }
        this.setState({
            currentCard: currentCard,
            cardHistory: cardHistory,
            preferGolden: preferGolden
        });        
    }

    setLocalStorageSettings ( saveStateLocal = false, preferGolden = false ) {
        /* This function is being passed down all the way to the settings modal 
        through props so that changes in the modal UI will be reflected at App level.
        Feels like too much work and too much opportunity for stnanks to be the 
        correct way of doing things. Redux? 
        */
        switch (saveStateLocal) {
            case true:
                this.setState({
                    saveStateLocal: saveStateLocal,
                    preferGolden: preferGolden
                })
                /* Delay needed to properly set state before 
                    reading state in function called.
                    These are peppered around in places 
                    where reading state apparently happens 
                    too quickly after setting it.
                */
                var rndFnc = () => this.writeLocalStorage( );
                setTimeout(function() { rndFnc() }, 100);
                break;
            case false:
                localStorage.clear();
                localStorage.setItem("saveStateLocal", "forget");
                this.setState({
                    saveStateLocal: saveStateLocal
                });
                break;
            default:
                break;
        }

    }

    writeLocalStorage() {
        if(this.state.saveStateLocal){
            let lastCardView = JSON.stringify(this.state.currentCard);
            let lastHistoryState = JSON.stringify(this.state.cardHistory);
            let goldenState = (this.state.preferGolden) ? "showbling" : "nobling";
                localStorage.setItem("saveStateLocal", "remember");
                localStorage.setItem("preferGoldenCards", goldenState)
                localStorage.setItem("lastCardView", lastCardView);
                localStorage.setItem("lastHistoryState", lastHistoryState);
        }
    }


    /* The idea is that every change of cards should
        go through this function. There are some stragglers,
        but it's pretty close.
    */
    changeCurrentCard ( newCard ) {
        let newHistory = this.state.cardHistory;
            newHistory.unshift( this.state.currentCard );
        this.setState({
            currentCard : newCard,
            cardHistory: newHistory
        });

        // Delay needed to properly set state before 
        // reading state in function called
        var rndFnc = () => { this.writeLocalStorage( ); };
            setTimeout(function() { rndFnc() }, 100);
    }

    changeHistory ( num, adding = true ) {
        if ( adding ) {
            /* Legacy code for a now removed option of 
            'jumping back' to a certain point in history. */
            let newCard = this.state.cardHistory[ num ];
            let newHistory = this.state.cardHistory.slice( num + 1);
            this.setState({
                currentCard: newCard,
                cardHistory: newHistory 
            })
         } else {             
            let newHistory = this.state.cardHistory;
                newHistory.splice(num, 1);
                this.setState({
                    cardHistory: newHistory
                })
        }
        this.writeLocalStorage();
    }

    handleNavMenuClick ( ev ) {                
        let newCard;
        switch (ev.target.name) {
            case "randomNav":
                newCard = hsData.getRandomCard();
                break;
            case "prevNav": 
                newCard = hsData.step(this.state.currentCard, "prev");
                break;
            case "nextNav":
                newCard = hsData.step(this.state.currentCard, "next");
                break;
            case "resetBtn":
                newCard = hsData.step(this.state.currentCard, "first");
                break;                
            default:
                newCard = hsData.getRandomCard();
                break;
        }

        this.changeCurrentCard( newCard );
    }

    handleRandom () {
        let rng = hsData.getRandomCard();
        this.changeCurrentCard( rng );
    }

    disableZooming () {
        /* Here be dragons. */
        document.addEventListener("touchmove", function (event) {
            if (event.scale !== 1) { event.preventDefault(); }
          }, false);

        var lastTouchEnd = 0;
        document.addEventListener("touchend", function (event) {
          var now = (new Date()).getTime();
          if (now - lastTouchEnd <= 300) {
            event.preventDefault();
          }
          lastTouchEnd = now;
        }, false);
    }

    handleDebug ( ev ) {
        /*...*/
    }

    render () {
        return (
            <div id="top-wrap" className="">
            {
            ( this.state.currentCard )
            ? (<div className="app-outer-wrapper">
                
                <MediaQuery minDeviceWidth={320}
                            maxDeviceWidth={766}>
                            <CardBrowserMobile 
                                cardData={ this.state.currentCard }
                                allCardsData={ this.state.allCards }
                                cardHistory={ this.state.cardHistory }
                                cardChangeHandler={ this.changeCurrentCard }
                                randomHandler={ this.handleRandom }
                                historyHandler={ this.handleNavMenuClick }
                                />
                </MediaQuery>
                <MediaQuery minDeviceWidth={767}
                            maxWidth={1223}>
                            <CardBrowserTablet
                                cardData={ this.state.currentCard } 
                                allCardsData={ this.state.allCards }
                                cardHistory={ this.state.cardHistory }
                                saveStateLocal={ this.state.saveStateLocal }
                                preferGolden={ this.state.preferGolden }
                                clickHandler={ this.handleNavMenuClick } 
                                cardChangeHandler={ this.changeCurrentCard }
                                historyChangeHandler= { this.changeHistory }
                                storageSettingsHandler={ this.setLocalStorageSettings }
                                />
                </MediaQuery>
                <MediaQuery minWidth={1224}>
                            <CardBrowserFull cardData={ this.state.currentCard } 
                                allCardsData={ this.state.allCards }
                                cardHistory={ this.state.cardHistory }
                                saveStateLocal={ this.state.saveStateLocal }
                                clickHandler={ this.handleNavMenuClick } 
                                cardChangeHandler={ this.changeCurrentCard }
                                historyChangeHandler= { this.changeHistory }
                                storageSettingsHandler={ this.setLocalStorageSettings }
                                />
                </MediaQuery>
             </div>)
            : (<div className="loader-wrap">
                <AppLoaderMessage text="Fetching a considerable chunk of data." />
             </div>)
            }
            {(this.state.debugging)
            ? <div className="dbr">
                <Button className="dbr-btn" name="dbg1" onClick={this.handleDebug}> Flush. Remember. </Button>
                <Button className="dbr-btn" name="dbg2" onClick={this.handleDebug}> Flush. Forget. </Button>
            </div>
            : ""
            }
            </div>
        )
    }
}