import React from "react";

import CardThumb from "./CardThumb.jsx";
import CardView from "./CardView.jsx";
import CardImage from "./CardImage.jsx";
import CardSearch from "./CardSearch.jsx";
import CardHistory from "./CardHistory.jsx";
import ModalSettings from "./ModalSettings.jsx";
import ModalAbout from "./ModalAbout.jsx";
import { Button, Navbar, NavDropdown,
        Nav, NavItem, MenuItem, OverlayTrigger, Popover, 
        Modal } from "react-bootstrap";

import "../css/medium.scss";

export default class CardBrowserTablet extends React.Component {
    constructor ( props ) {
        super( props );
        this.state = { 
            cardData: this.props.cardData,
            cardHistory : this.props.cardHistory,
            saveStateLocal: this.props.saveStateLocal,
            preferGolden: this.props.preferGolden,
            showSettings : false,
            showAbout: false
        }        
        this.showHideSettings = this.showHideSettings.bind(this);
        this.showHideAbout = this.showHideAbout.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
        this.onChangeReady = this.onChangeReady.bind(this);
       
    }


    /* Pretty sure this ... */
    onChangeReady() {
        this.setState({
            cardData: this.props.cardData
        });
    }
    /* ... is safe to delete. 
        Used to wrangle waiting for animation.  */

    showHideSettings () {
        this.setState({
            showSettings: !this.state.showSettings
        })
    }

    showHideAbout () {        
        this.setState({
            showAbout: !this.state.showAbout
        })
    }

    saveSettings( saveStateLocal, preferGolden ) {

        this.props.storageSettingsHandler( saveStateLocal, preferGolden );
        /* 
        * In theory, if I have this right, this (below) should not
        * be necessary because the changes set in this.props.storageSettingsHandler
        * should propagate down. In practice, I'm keeping it around.
        */
        this.setState({
            showSettings: !this.state.showSettings,
            saveStateLocal: saveStateLocal,
            preferGolden: preferGolden
        })
    }

    componentWillReceiveProps (nextProps) {        
        if( nextProps.cardHistory ){
            this.setState({
                cardHistory: nextProps.cardHistory
            });
        if( nextProps.cardData ){
            this.setState({
                cardData: nextProps.cardData
            })
            }
        if ( nextProps.preferGolden ) {
            this.setState({
                preferGolden: nextProps.preferGolden
            })
            }
        }

    }

    render () {
        return (
            <div className="app-wrap mediumscreen">
            <Modal show={this.state.showSettings} onHide={this.showHideSettings}>

                <ModalSettings 
                    dismissHandler={ this.showHideSettings } 
                    saveHandler={ this.saveSettings } 
                    goToFirst={ this.props.clickHandler } 
                    saveStateLocal={ this.state.saveStateLocal } 
                    preferGolden={ this.state.preferGolden }
                    />
            </Modal>
            <Modal show={this.state.showAbout} onHide={this.showHideAbout}>
                <ModalAbout dismissHandler={this.showHideAbout} />
            </Modal>
                {/* Next up for componentizing: The NavBar! */}
                <Navbar inverse fluid>
                        <Nav>
                            <NavDropdown eventKey={4} title="Meta" id="basic-nav-dropdown">
                                <MenuItem name="settingsNav" 
                                            className="nav-dropdown-item"
                                            eventKey={4.1} 
                                            href="#" 
                                            onClick={this.showHideSettings}>
                                            Settings
                                        </MenuItem>
                                <MenuItem name="aboutNav" 
                                            className="nav-dropdown-item" 
                                            eventKey={4.2} 
                                            href="#" 
                                            onClick={this.showHideAbout}>
                                            About
                                        </MenuItem>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <NavItem name="randomNav" 
                                        eventKey={1} 
                                        href="#" 
                                        onClick={this.props.clickHandler}>
                                        Random Card
                                    </NavItem>
                            <NavItem name="prevNav" 
                                        eventKey={2} 
                                        href="#" 
                                        onClick={this.props.clickHandler}>
                                        Prev
                                    </NavItem>
                            <NavItem name="nextNav" 
                                        eventKey={3} 
                                        href="#" 
                                        onClick={this.props.clickHandler}>
                                        Next
                                    </NavItem>
                        </Nav>
                        
                        <Nav pullRight>
                            <CardSearch allCards={ this.props.allCardsData } 
                                        currentCard={ this.props.cardData }
                                        cardChangeHandler={ this.props.cardChangeHandler } 
                                        />
                        </Nav>
                </Navbar>
                <div className="hscard-container">
                    <CardView 
                        cardData={ this.state.cardData } 
                        preferGolden={ this.state.preferGolden }
                        changeReadyHandler= { this.onChangeReady }
                         />
                </div>

                <div id="under-body" className="history-container">
                    <CardHistory 
                        cardHistory={ this.state.cardHistory }
                        preferGolden={ this.state.preferGolden }
                        cardChangeHandler={ this.props.cardChangeHandler }
                        historyChangeHandler={ this.props.historyChangeHandler }
                        />
                </div>
            </div>
        )
    }
}