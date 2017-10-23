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
        this.state = {
            allCards: null,
            someCards: null,
            currentCard: null,
            cardHistory: [],
            useLocalStorage: true
        }
        this.handleClick = this.handleClick.bind(this);
        this.changeCurrentCard = this.changeCurrentCard.bind(this);
        this.changeHistory = this.changeHistory.bind(this);
        this.getLocalStorage = this.getLocalStorage.bind(this);
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
                let current = hsData.getRandomCard( );

                this.setState({
                    allCards: cards,
                    someCards: cards,
                    currentCard: current
                });

            } else {
                console.log(new Error('Havoc!'));
            }
        });
    }

    getLocalStorage () {
        if(localStorage) {
            let card = JSON.parse( localStorage.getItem( 'lastCardViewed'));
            let history = JSON.parse( localStorage.getItem( 'viewHistory'));
                this.setState({
                    currentCard: card,
                    cardHistory: history
                })
            
        } else {
            console.log('No local history.')
        }
    }

    setLocalStorage () {
        let card = this.state.currentCard;
        let history = this.state.cardHistory;
        localStorage.setItem('lastCardViewed', JSON.stringify(card));
        localStorage.setItem('viewHistory', JSON.stringify(history));
    }

    changeCurrentCard ( newCard ) {
        let newHistory = this.state.cardHistory;
            newHistory.unshift( this.state.currentCard );
        this.setState({
            currentCard : newCard,
            cardHistory: newHistory
        })
        // this.setLocalStorage();
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
                                clickHandler={ this.handleClick } 
                                cardChangeHandler={ this.changeCurrentCard }
                                historyChangeHandler= { this.changeHistory }
                                localGetter= {this.getLocalStorage}/>
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
            </div>
        )
    }
}