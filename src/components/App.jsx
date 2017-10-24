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
<<<<<<< HEAD
        let localDataValue = localStorage.getItem('saveStateLocal');
        let yesno = false;
            if(localDataValue == 'remember'){
                yesno = true;
            } else {
                yesno = false;
            }

=======
        let decider = localStorage.getItem('saveState');
        let yesNo = (decider == 'remember') ? true : false;
        
>>>>>>> 8983d508b8f03128898941378e288a6568528c0f
        this.state = {
            allCards: null,
            someCards: null,
            currentCard: null,
            cardHistory: [],
<<<<<<< HEAD
            saveStateLocal: yesno,
            debugging: true
=======
            saveStateLocal: yesNo,
            preferGolden: false,
            debug: true
>>>>>>> 8983d508b8f03128898941378e288a6568528c0f
        }

        
        console.log(`
            App Constructor:
            decider is: ${decider}
            this.state.saveStateLocal is: ${this.state.saveStateLocal}
        `)

        this.handleClick = this.handleClick.bind(this);
        this.handleRandom = this.handleRandom.bind(this);
        this.changeCurrentCard = this.changeCurrentCard.bind(this);
        this.changeHistory = this.changeHistory.bind(this);
<<<<<<< HEAD

        this.setLocalStorageSettings = this.setLocalStorageSettings.bind(this);
        this.setInitialState = this.setInitialState.bind(this);
        this.handleDebug = this.handleDebug.bind(this);
=======
        this.setCookieState = this.setCookieState.bind(this);
        this.saveStateLocally = this.saveStateLocally.bind(this);
        
        this.handleTesting = this.handleTesting.bind(this);
>>>>>>> 8983d508b8f03128898941378e288a6568528c0f
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
<<<<<<< HEAD
                this.setState({
                    allCards: cards,
                    someCards: cards
                })

                this.setInitialState();
=======
                let card = hsData.getRandomCard();

                this.setState({
                    allCards: cards,
                    someCards: cards
                });
                

                if(this.state.saveStateLocal) {
                    let savedHistoryState = JSON.parse(localStorage.getItem('historyState'));
                    let savedLastCardViewed = JSON.parse(localStorage.getItem('lastCardViewed'));
                    let savedPreferGolden = localStorage.getItem('preferGolden');
                        console.log(`
                        on mounting, this from localStorage:
                        savedHistoryState: ${savedHistoryState.length}
                        savedLastCardViewed: ${savedLastCardViewed.name}
                        preferGolden: ${savedPreferGolden}
                        ===============================
                        `)
                        let goldYesNo = (savedPreferGolden == 'golden') ? true : false;
                        this.setState({
                            currentCard: savedLastCardViewed,
                            cardHistory: savedHistoryState,
                            preferGolden: goldYesNo
                        })
                } else {
                    this.changeCurrentCard( card );
                }
>>>>>>> 8983d508b8f03128898941378e288a6568528c0f

            } else {
                console.log(new Error('Havoc!'));
            }
        });
    }

<<<<<<< HEAD
    setInitialState() {
        let currentCard = hsData.getRandomCard();
        let cardHistory = [];
        if( this.state.saveStateLocal ) {
            let savedCard = JSON.parse(localStorage.getItem('lastCardView'));
            let savedHistory = JSON.parse(localStorage.getItem('lastHistoryState'));                
                if(savedCard != null) currentCard = savedCard;
                if(savedHistory != null) cardHistory = savedHistory;
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
=======
    setCookieState( saveStateLocal, preferGolden, bullCrap = null ) {
        this.setState({
            saveStateLocal: saveStateLocal,
            preferGolden: preferGolden
        });
        if(!saveStateLocal) {
            localStorage.clear();
            localStorage.setItem('saveState', 'forget');
>>>>>>> 8983d508b8f03128898941378e288a6568528c0f
        }
        
    }

<<<<<<< HEAD
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
=======
    saveStateLocally ( ) {        
        localStorage.setItem('lastCardViewed', JSON.stringify(this.state.currentCard));
        localStorage.setItem('historyState', JSON.stringify(this.state.cardHistory));
    }

    changeCurrentCard ( inputCard ) {
        
        if(this.state.currentCard) {
            let newHistory = this.state.cardHistory;
                newHistory.unshift( this.state.currentCard );
            this.setState({
                currentCard : inputCard,
                cardHistory: newHistory
            })

        } else {
            this.setState({
                currentCard: inputCard
            })
        }
        setTimeout(this.saveStateLocally, 100);
>>>>>>> 8983d508b8f03128898941378e288a6568528c0f
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
             console.log('Splicing history');
             
            let newHistory = this.state.cardHistory;
                newHistory.splice(num, 1);
                this.setState({
                    cardHistory: newHistory
                })
<<<<<<< HEAD
        }
        this.writeLocalStorage();
=======
            }

>>>>>>> 8983d508b8f03128898941378e288a6568528c0f
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

<<<<<<< HEAD
    handleRandom () {
        let rng = hsData.getRandomCard();
        this.changeCurrentCard( rng );
    }

    handleDebug ( ev ) {
            // Helper function for debugging

            localStorage.clear();
            localStorage.setItem('saveStateLocal', 'remember');
=======
    handleTesting ( ev ) {
        localStorage.clear();
>>>>>>> 8983d508b8f03128898941378e288a6568528c0f
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
                                randomHandler={ this.handleRandom }/>
                </MediaQuery>
                <MediaQuery minDeviceWidth={767}>
                            <CardBrowserTablet 
                                cardData={ this.state.currentCard } 
                                allCardsData={ this.state.allCards }
                                cardHistory={ this.state.cardHistory }
                                saveStateLocal={ this.state.saveStateLocal }
<<<<<<< HEAD
                                clickHandler={ this.handleClick } 
                                cardChangeHandler={ this.changeCurrentCard }
                                historyChangeHandler= { this.changeHistory }
                                storageSettingsHandler={ this.setLocalStorageSettings }
                                />
=======
                                preferGolden={ this.state.preferGolden }
                                clickHandler={ this.handleClick } 
                                cardChangeHandler={ this.changeCurrentCard }
                                historyChangeHandler= { this.changeHistory }
                                saveStateHandler= {this.setCookieState}/>
>>>>>>> 8983d508b8f03128898941378e288a6568528c0f
                </MediaQuery>
                {/* <MediaQuery minWidth={1224}
                            className="app-wrap desktop">
                            <CardBrowserFull cardData={ this.state.currentCard } />
                </MediaQuery> */}
             </div>)
            : (<div className="loader-wrap">
                <AppLoaderMessage text="Hang on to yer boots!" />
             </div>)
            }
<<<<<<< HEAD
            {(this.state.debugging)
            ? <Button onClick={this.handleDebug}> Hit me! </Button>
=======
            {
            (this.state.debug)
            ? <button onClick={this.handleTesting}>Hit me!</button>
>>>>>>> 8983d508b8f03128898941378e288a6568528c0f
            : ''
            }
            </div>
        )
    }
}