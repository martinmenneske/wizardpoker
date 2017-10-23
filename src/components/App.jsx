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
        let decider = localStorage.getItem('saveState');
        let yesNo = (decider == 'remember') ? true : false;
        
        this.state = {
            allCards: null,
            someCards: null,
            currentCard: null,
            cardHistory: [],
            saveStateLocal: yesNo,
            preferGolden: false,
            debug: true
        }

        
        console.log(`
            App Constructor:
            decider is: ${decider}
            this.state.saveStateLocal is: ${this.state.saveStateLocal}
        `)

        this.handleClick = this.handleClick.bind(this);
        this.changeCurrentCard = this.changeCurrentCard.bind(this);
        this.changeHistory = this.changeHistory.bind(this);
        this.setCookieState = this.setCookieState.bind(this);
        this.saveStateLocally = this.saveStateLocally.bind(this);
        
        this.handleTesting = this.handleTesting.bind(this);
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

            } else {
                console.log(new Error('Havoc!'));
            }
        });
    }

    setCookieState( saveStateLocal, preferGolden, bullCrap = null ) {
        this.setState({
            saveStateLocal: saveStateLocal,
            preferGolden: preferGolden
        });
        if(!saveStateLocal) {
            localStorage.clear();
            localStorage.setItem('saveState', 'forget');
        }
        
    }

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
            }

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

    handleTesting ( ev ) {
        localStorage.clear();
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
                                randomHandler={ this.handleClick }/>
                </MediaQuery>
                <MediaQuery minDeviceWidth={767}>
                            <CardBrowserTablet 
                                cardData={ this.state.currentCard } 
                                allCardsData={ this.state.allCards }
                                cardHistory={ this.state.cardHistory }
                                saveStateLocal={ this.state.saveStateLocal }
                                preferGolden={ this.state.preferGolden }
                                clickHandler={ this.handleClick } 
                                cardChangeHandler={ this.changeCurrentCard }
                                historyChangeHandler= { this.changeHistory }
                                saveStateHandler= {this.setCookieState}/>
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
            {
            (this.state.debug)
            ? <button onClick={this.handleTesting}>Hit me!</button>
            : ''
            }
            </div>
        )
    }
}