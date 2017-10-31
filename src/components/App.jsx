import React from 'react';
import ReactDOM from 'react-dom';
import MediaQuery from 'react-responsive';

import SuperAgent from 'superagent';
import HSData from '../js/HSData.js';

import AppLoaderMessage from './AppLoaderMessage.jsx';
import CardBrowserMobile from './CardBrowserMobile.jsx';
import CardBrowserTablet from './CardBrowserTablet.jsx';
import CardBrowserFull from './CardBrowserFull.jsx';

import '../css/all.scss';

import { Button } from 'react-bootstrap';

const API_URL = 'https://omgvamp-hearthstone-v1.p.mashape.com/cards?collectible=1';
const API_CREDS = {'X-Mashape-Key': 'oWBWUrFHJJmshIc9h9k1c034BThep1uCZTFjsnNat8Vi3QzlSY'};
const API_OPTIONS = {'Accept': 'application/json'};

var hsData = new HSData();

export default class App extends React.Component {

    constructor( props ) {
        super( props );

        let localDataValue = localStorage.getItem('saveStateLocal');
        let localStorageYesno = false;
            if(localDataValue == 'remember'){
                localStorageYesno = true;
            } else {
                localStorageYesno = false;
            }

        this.state = {
            allCards: null,
            someCards: null,
            currentCard: null,
            cardHistory: [],
            saveStateLocal: localStorageYesno,
            debugging: false
        }

        this.handleClick = this.handleClick.bind(this);
        this.handleRandom = this.handleRandom.bind(this);
        this.changeCurrentCard = this.changeCurrentCard.bind(this);
        this.changeHistory = this.changeHistory.bind(this);

        this.setLocalStorageSettings = this.setLocalStorageSettings.bind(this);
        this.setInitialState = this.setInitialState.bind(this);
        this.handleDebug = this.handleDebug.bind(this);
    }

    componentDidMount() {
        SuperAgent.get(API_URL)
                    .set(API_CREDS)
                    .set(API_OPTIONS)
                    .end((error, rawJson) => {
                        if( error ) {
                            console.log(new Error('API Fuckup!'));
                        } else if ( rawJson ) {                
                            let cards = hsData.makeData( rawJson );
                            this.setState({
                                allCards: cards,
                                someCards: cards
                            })
                            
                            this.setInitialState();

                        } else {
                            console.log(new Error('Havoc!'));
                        }
                    });
    }

    setInitialState() {
        let currentCard = hsData.getRandomCard();
        let cardHistory = [];
        if( this.state.saveStateLocal ) {
            let savedCard = JSON.parse(localStorage.getItem('lastCardView'));
            let savedHistory = JSON.parse(localStorage.getItem('lastHistoryState'));                
                if(savedCard != null) currentCard = savedCard;
                if(savedHistory != null) cardHistory = savedHistory.slice(0,50);
        }

        this.setState({
            currentCard: currentCard,
            cardHistory: cardHistory
        });
    }

    setLocalStorageSettings ( saveStateLocal = false ) {
        switch (saveStateLocal) {
            case true:
                this.setState({
                    saveStateLocal: saveStateLocal
                })
                // Delay needed to properly set state before 
                // reading state in function called
                var rndFnc = () => this.writeLocalStorage( );
                setTimeout(function() { rndFnc() }, 100);
                break;
            case false:
                localStorage.clear();
                localStorage.setItem('saveStateLocal', 'forget');
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

            localStorage.setItem('saveStateLocal', 'remember');
            localStorage.setItem('lastCardView', lastCardView);
            localStorage.setItem('lastHistoryState', lastHistoryState);
        }
    }

    changeCurrentCard ( newCard ) {
        let newHistory = this.state.cardHistory;
            newHistory.unshift( this.state.currentCard );
        this.setState({
            currentCard : newCard,
            cardHistory: newHistory
        });
        // Delay needed to properly set state before 
        // reading state in function called
        var rndFnc = () => this.writeLocalStorage( );
            setTimeout(function() { rndFnc() }, 100);
    }

    changeHistory ( num, adding = true ) {        
        if ( adding ) {
            let newCard = this.state.cardHistory[ num ];
            let newHistory = this.state.cardHistory.slice( num + 1 )

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

    handleClick ( ev ) {                
        let newCard;

        switch (ev.target.name) {
            case 'randomNav':
                newCard = hsData.getRandomCard();
                break;
            case 'prevNav': 
                newCard = hsData.step(this.state.currentCard, 'prev');
                break;
            case 'nextNav':
                newCard = hsData.step(this.state.currentCard, 'next');
                break;
            case 'resetBtn':
                newCard = hsData.step(this.state.currentCard, 'first');
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

    handleDebug ( ev ) {
            // Helper function for debugging

            localStorage.clear();
            localStorage.setItem('saveStateLocal', 'remember');
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
                                historyHandler={ this.handleClick }
                                />
                </MediaQuery>
                <MediaQuery minDeviceWidth={767}
                            maxWidth={1223}>
                            <CardBrowserTablet
                                cardData={ this.state.currentCard } 
                                allCardsData={ this.state.allCards }
                                cardHistory={ this.state.cardHistory }
                                saveStateLocal={ this.state.saveStateLocal }
                                clickHandler={ this.handleClick } 
                                cardChangeHandler={ this.changeCurrentCard }
                                historyChangeHandler= { this.changeHistory }
                                storageSettingsHandler={ this.setLocalStorageSettings }
                                />
                </MediaQuery>
                <MediaQuery minWidth={1224}
                            className="app-wrap desktop">
                            <CardBrowserFull cardData={ this.state.currentCard } 
                                allCardsData={ this.state.allCards }
                                cardHistory={ this.state.cardHistory }
                                saveStateLocal={ this.state.saveStateLocal }
                                clickHandler={ this.handleClick } 
                                cardChangeHandler={ this.changeCurrentCard }
                                historyChangeHandler= { this.changeHistory }
                                storageSettingsHandler={ this.setLocalStorageSettings }
                                />
                </MediaQuery>
             </div>)
            : (<div className="loader-wrap">
                <AppLoaderMessage text="Holy smokes!" />
             </div>)
            }
            {(this.state.debugging)
            ? <Button onClick={this.handleDebug}> Hit me! </Button>
            : ''
            }
            </div>
        )
    }
}