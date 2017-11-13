import React from "react";
import CardImage from "./CardImage.jsx";
import CardMeta from "./CardMeta.jsx";
import CardSearch from "./CardSearch.jsx";
import PullToRefresh from "../js/pulltorefresh.min.js";

import FileImageIcon from "react-icons/lib/go/file-media";
import FileTextIcon from "react-icons/lib/go/file-text";
import SearchIcon from "react-icons/lib/go/search";
import RandomIcon from "react-icons/lib/md/cached";

import "../css/small.scss";

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
        this.handleRandom = this.handleRandom.bind(this);
    }

    componentDidMount () {
        let scope = this;

        PullToRefresh.init({
            mainElement: "#content",
            instructionsReleaseToRefresh: "Release to load a card at random",
            instructionsRefreshing: "Loading",

            onRefresh: function(){ 
                scope.handleRandom();
            }
          });
    }

    handleRandom () {
        this.props.randomHandler();
        let hscard = document.getElementById("hscard");
        if( hscard.classList.contains("flipped") ) {
            hscard.className = "";
            this.setState({
                flipped: false
            });
        }
    }

    handleChangeCard( card ) {        
        this.setState({
            searching: false,
            flipped: false
        })
        let hscard = document.getElementById("hscard");
            hscard.className = "";
        this.props.cardChangeHandler( card );
    }

    handleFlipClick ( ev ) {
        let hscard = document.getElementById("hscard");
            if( hscard.classList.contains("flipped") ) {
                hscard.className = "";
                this.setState({
                    flipped: false
                })
            } else {
                hscard.className = "flipped";
                this.setState({
                    flipped: true
                });
            }     
    }

    handleSearchClick () {
        this.setState({
            searching: !this.state.searching
        });
    }

    render () {
        return (
            <div className="app-wrap smallscreen">
                <div className="landscape-blocker">
                    <h1>Uh-oh</h1>
                    <p>
                        Landscape orientation at this size really doesn't work at all. Sorry.
                    </p>
                </div>
                <div className="app-inner-wrapper">
                    {(this.state.searching)
                    ? <div className="search-container">
                    <CardSearch allCards={ this.props.allCardsData } 
                                currentCard={ this.props.cardData }
                                cardChangeHandler={ this.handleChangeCard } 
                                autoFocusSetting={ true } 
                                />
                    </div>
                    : ""
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
                        <a className="random-btn" onClick={this.handleRandom}>
                            <RandomIcon />
                        </a>
                        {(this.state.flipped)
                        ? <a className="flip-btn" onClick={this.handleFlipClick}>
                            <FileImageIcon />
                        </a>
                        :<a className="flip-btn" onClick={this.handleFlipClick}>
                            <FileTextIcon />
                        </a>
                        }
                        <a className="search-btn" onClick={this.handleSearchClick}>
                            <SearchIcon />
                        </a>
                    </nav>
                </div>
            </div>
        )
    }
}