import React from 'react';

import CardThumb from './CardThumb.jsx';
import CardView from './CardView.jsx';
import CardImage from './CardImage.jsx';
import CardSearch from './CardSearch.jsx';
import CardHistory from './CardHistory.jsx';
import ModalSettings from './ModalSettings.jsx';
import ModalAbout from './ModalAbout.jsx';
import AboutIcon from 'react-icons/lib/md/help';
import { Button, Navbar, NavbarBrand, NavbarHeader, NavDropdown,
        Nav, NavItem, MenuItem, OverlayTrigger, Popover, 
        Modal } from 'react-bootstrap';

import '../css/medium.scss';

export default class CardBrowserTablet extends React.Component {
    constructor ( props ) {
        super( props );
        this.state = { 
            cardHistory : this.props.cardHistory,
            showSettings : false,
            showAbout: false,
            saveStateLocal: this.props.saveStateLocal,
            preferGolden: this.props.preferGolden,
            cardData: this.props.cardData
        }        
        this.showHideSettings = this.showHideSettings.bind(this);
        this.showHideAbout = this.showHideAbout.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
        this.onChangeReady = this.onChangeReady.bind(this);
    }

    onChangeReady() {
        console.log('OnChabgeReady called');
        
        this.setState({
            cardData: this.props.cardData
        });
    }

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
        this.props.storageSettingsHandler( saveStateLocal );
        this.setState({
            showSettings: !this.state.showSettings,
            saveStateLocal: saveStateLocal,
            preferGolden: preferGolden
        })
    }

    componentWillReceiveProps (nextProps) {        
        if(nextProps.cardHistory){
            this.setState({
                cardHistory: nextProps.cardHistory
            });
        if( nextProps.cardData ){
            this.setState({
                cardData: nextProps.cardData
            })
            }
        }
    }

    render () {
        return (
            <div className="app-wrap mediumscreen">
            <Modal show={this.state.showSettings} onHide={this.showHideSettings}>
                <ModalSettings 
                    dismissHandler={this.showHideSettings} 
                    saveHandler={this.saveSettings} 
                    goToFirst={this.props.clickHandler} 
                    saveStateLocal={this.state.saveStateLocal} 
                    preferGolden={this.state.preferGolden}
                    />
            </Modal>
            <Modal show={this.state.showAbout} onHide={this.showHideAbout}>
                <ModalAbout dismissHandler={this.showHideAbout} />
            </Modal>
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
                        cardChangeHandler={ this.props.cardChangeHandler }
                        historyChangeHandler={ this.props.historyChangeHandler }
                        />
                </div>
            </div>
        )
    }
}