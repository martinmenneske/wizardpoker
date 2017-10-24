import React from 'react';
import CardImage from './CardImage.jsx';
import CardMeta from './CardMeta.jsx';
import CardSearch from './CardSearch.jsx';
import { Button } from 'react-bootstrap';
import PullToRefresh from 'react-pull-to-refresh';
import FileImageIcon from 'react-icons/lib/go/file-media';
import FileTextIcon from 'react-icons/lib/go/file-text';
import SearchIcon from 'react-icons/lib/go/search';
import RandomIcon from 'react-icons/lib/md/cached';
import PrefsIcon from 'react-icons/lib/go/terminal';


import '../css/small.scss';

export default class CardBrowserMobile extends React.Component {

    constructor ( props ) {
        super ( props );
        this.state = {
            flipped: false,
            searching: false
        }
        this.handleFlipClick = this.handleFlipClick.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleChangeCard = this.handleChangeCard.bind(this);
        this.handlePullRefresh = this.handlePullRefresh.bind(this);
    }

    handleChangeCard( card ) {        
        this.setState({
            searching: false,
            flipped: false
        })
        let hscard = document.getElementById('hscard');
        hscard.className = '';
        this.props.cardChangeHandler( card );
    }

    handlePullRefresh(resolve, reject) {
        if (resolve) {
            // Buggy shit for delaying image load until pullrefresher is done
            var rndFnc = () => this.props.randomHandler( );
            setTimeout(function() { rndFnc() }, 500);
            // this.props.randomHandler( )
            let hscard = document.getElementById('hscard');
                hscard.className = '';
                this.setState({
                    flipped: false
                })

            resolve();
        } else {
            console.log('Fail!');
            reject();
        }
    }

    handleFlipClick ( e ) {
        let hscard = document.getElementById('hscard');
            if( hscard.classList.contains('flipped') ) {
                hscard.className = '';
                this.setState({
                    flipped: false
                })
            } else {
                hscard.className = 'flipped';
                this.setState({
                    flipped: true
                })
            }     
    }

    handleSearchClick () {
        this.setState({
            searching: !this.state.searching
        })
        console.log('searching: ' + this.state.searching);
        
    }

    render () {
        return (
            <div className="app-wrap smallscreen"> 
                <div className="hscard-container">
                <PullToRefresh
                    onRefresh={this.handlePullRefresh}
                    className="pull-refresher"
                    resistance={1}>
                    <div id="content">
                            <div id="hscard">
                                <div className="hscard-front">
                                    <CardImage cardData={ this.props.cardData } />
                                </div>
                                <div className="hscard-back">
                                    <CardMeta cardData={ this.props.cardData } />
                                </div>
                            </div>
                        </div>
                        </PullToRefresh>
                </div>
                {(this.state.searching)
                ? <div className="search-container">
                <CardSearch allCards={ this.props.allCardsData } 
                                        currentCard={ this.props.cardData }
                                        cardChangeHandler={ this.handleChangeCard } 
                                        autoFocusSetting={ true } />
                </div>
                : ''
                }
                <nav className="under">
                    {(this.state.flipped)
                    ? <a className="flip-btn" onClick={this.handleFlipClick}>
                        <FileImageIcon />
                    </a>
                    :<a className="flip-btn" onClick={this.handleFlipClick}>
                        <FileTextIcon />
                    </a>
                    }
                    <a className="random-btn" onClick={this.props.randomHandler}>
                        <RandomIcon />
                    </a>
                    <a className="search-btn" onClick={this.handleSearchClick}>
                        <SearchIcon />
                    </a>
                    {/* <a className="prefs-btn" onClick={this.handlePrefsClick}>
                        <PrefsIcon />
                    </a>                     */}
                </nav>
            </div>
        )
    }
}