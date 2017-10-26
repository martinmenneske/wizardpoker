import React from 'react';
import CardImage from './CardImage.jsx';
import CardMeta from './CardMeta.jsx';
import CardSearch from './CardSearch.jsx';
import { Button } from 'react-bootstrap';
import PullToRefresh from '../js/pulltorefresh.min.js';
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

    componentDidMount () {
        var scope = this;

        PullToRefresh.init({
            mainElement: '#content',
            onRefresh: function(){ 
                console.log("Did it!"); 
                scope.props.randomHandler ();
            }
          });
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
            
           
            this.props.randomHandler( )
            let hscard = document.getElementById('hscard');
                hscard.className = '';
                this.setState({
                    flipped: false
                })
            
                // TODO: setTimeOut because of delay in react-pull-to-refresh.
                // Feels bad, but seems wonky without it.
                // var rndFnc = () => resolve();
                // setTimeout(function() { rndFnc() }, 1000);

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
                <div className="landscape-blocker">
                    <h1>Uh-oh...</h1>
                    <p>
                        Landscape orientation at this size really doesn't work at all. Sorry...
                    </p>
                </div>
                <div className="app-inner-wrapper">
                    {(this.state.searching)
                    ? <div className="search-container">
                    <CardSearch allCards={ this.props.allCardsData } 
                                            currentCard={ this.props.cardData }
                                            cardChangeHandler={ this.handleChangeCard } 
                                            autoFocusSetting={ true } 
                                            hammerOptions={{ direction: Hammer.DIRECTION_ALL }}/>
                    </div>
                    : ''
                    }
                    <div className="hscard-container">

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

                    </div>
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
            </div>
        )
    }
}