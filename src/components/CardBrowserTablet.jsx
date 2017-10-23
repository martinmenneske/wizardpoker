import React from 'react';
import CardImage from './CardImage.jsx';
import CardThumb from './CardThumb.jsx';
import CardMeta from './CardMeta.jsx';
import CardSearch from './CardSearch.jsx';
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
            storeState: false,
            loadGolden: false,
            storeJson: false
        }
        this.showHideSettings = this.showHideSettings.bind(this);
        this.showHideAbout = this.showHideAbout.bind(this);
        this.saveSettings = this.saveSettings.bind(this);
    }

    componentDidMount () {

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

    saveSettings( browse, bling, store ) {
        this.setState({
            showSettings: !this.state.showSettings,
            storeState: browse,
            loadGolden: bling,
            storeJson: store
        })
        
    }

    createToolTip ( item ){
        return <Tooltip bsSize="large" id="tooltip">{ item.name }</Tooltip>;
    }

    createPopOver ( item, i ){
        let refName = item.name + i;
        let scope = this;
        function doClick ( who ) {
            switch ( who ) {
                case 'goBack':
                    scope.props.historyChangeHandler(i);
                    break;
                case 'loadAgain':
                    scope.props.cardChangeHandler( item );
                    break;
                case 'remove':
                    scope.props.historyChangeHandler(i, false);
                    break;
                default:
                    break;
            }
            scope.refs[refName].hide();
        }

        return (
            <Popover className="history-popover" id="popover-positioned-top" title={item.name}>
                <div style={{ width: 150 }}>
                    <Button block onClick={()=> doClick('loadAgain')}>Load again</Button>
                    <Button block onClick={()=> doClick('goBack')}>Go back</Button> 
                    <Button block onClick={()=> doClick('remove')}>Remove</Button>
                </div>
            </Popover>
        )
    }

    componentWillReceiveProps (nextProps) {        
        this.setState({
            cardHistory : nextProps.cardHistory
        })
    }

    render () {
        return (
            <div className="app-wrap mediumscreen">
            <Modal show={this.state.showSettings} onHide={this.showHideSettings}>
                <ModalSettings 
                    dismissHandler={this.showHideSettings} 
                    saveHandler={this.saveSettings} 
                    goToFirst={this.props.clickHandler} 
                    currentSettings={{browse: this.state.storeState, bling: this.state.loadGolden, store: this.state.storeJson}}/>
            </Modal>
            <Modal show={this.state.showAbout} onHide={this.showHideAbout}>
                <ModalAbout dismissHandler={this.showHideAbout} />
            </Modal>
                <Navbar inverse fluid>
                    {/* <Navbar.Header>
                        <Navbar.Brand>
                            <a onClick={this.props.localGetter} href="#"><AsteriskIcon /></a>
                        </Navbar.Brand>
                    </Navbar.Header> */}
                        <Nav>
                            <NavDropdown eventKey={4} title="Meta" id="basic-nav-dropdown">
                                <MenuItem name="settingsNav" eventKey={4.1} href="#" onClick={this.showHideSettings}>Settings</MenuItem>
                                <MenuItem name="abouNav" eventKey={4.2} href="#" onClick={this.showHideAbout}>About</MenuItem>
                            </NavDropdown>
                        </Nav>
                        <Nav>
                            <NavItem name="randomNav" eventKey={1} href="#" onClick={this.props.clickHandler}>Random Card</NavItem>
                            <NavItem name="prevNav" eventKey={2} href="#" onClick={this.props.clickHandler}>Prev</NavItem>
                            <NavItem name="nextNav" eventKey={3} href="#" onClick={this.props.clickHandler}>Next</NavItem>
                        </Nav>
                        
                        <Nav pullRight>
                            <CardSearch allCards={ this.props.allCardsData } 
                                        currentCard={ this.props.cardData }
                                        cardChangeHandler={ this.props.cardChangeHandler } />
                        </Nav>
                </Navbar>
                <div className="hscard-container">
                    <CardImage cardData={ this.props.cardData } golden={ false } />
                    <CardMeta cardData={ this.props.cardData } />
                </div>
                <div id="under-body" className="history-container">
                    <div className="scroll-box">
                        <ul>
                            {(this.state.cardHistory)
                                ? this.state.cardHistory.map((item,i) => <li className="thumb-list-item" key={i}>
                                <OverlayTrigger ref={item.name + i} trigger="click" placement="top" rootClose overlay={this.createPopOver(item, i)}>
                                    <div className="thumbnail-wrap">
                                        <div className="thumbnail">
                                            
                                            {/* <a href="#" key={i} onClick={() => this.props.historyChangeHandler( i ) }>   */}
                                                <CardThumb cardData={item} />
                                            {/* </a> */}
                                            
                                        </div>
                                    </div>
                                    </OverlayTrigger>
                                </li>)
                                : null
                            }
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}