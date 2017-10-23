import React from 'react';
import { Nav, NavItem, Tabs, Tab } from 'react-bootstrap';

export default class CardMeta extends React.Component {

    constructor ( props ) {
        super( props );
        this.state = {
            card: props.cardData,
            key: 1

        }

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(key) {
        this.setState({key});
      }

    componentWillReceiveProps(nextProps) {
         this.setState({ card: nextProps.cardData });  
      }

    render() {
        let card = this.state.card;
        let multiClass = this.state.card.classes;
        let textHTML = card.text ? {__html: card.text.replace(/\\n/g, '<br>').replace(/\[x\]/, '')} : '';
        let flavorHTML = card.flavor ? {__html: card.flavor} : '';
        return (
            <div className="hscard-meta-box">
                <div className="hscard-meta-container card text-white bg-dark mb-3">
                    <Tabs activeKey={this.state.key} onSelect={this.handleSelect} id="hscard-meta-tab-nav">
                        <Tab eventKey={1} title="Info">
                            <div className="card-block">
                                <div className='hscard-title meta-list'>
                                    <span className='meta-key'>Title:  </span>
                                    <span className='meta-value'>{ card.name }</span>
                                </div>
                                <div className='hscard-artist meta-list'> 
                                    <span className='meta-key'>Artist:  </span>
                                    <span className='meta-value'>{ card.artist }</span>
                                </div>
                                
                                <div className='hscard-artist meta-list'> 
                                    <span className='meta-key'>Rarity:  </span>
                                    <span className='meta-value'>{ card.rarity }</span>
                                </div>
                                <div className='hscard-artist meta-list'> 
                                    <span className='meta-key'>Set:  </span>
                                    <span className='meta-value'>{ card.cardSet }</span>
                                </div>
                                {(card.howToGet)
                                ?  ( <div className='hscard-artist meta-list'> 
                                        <span className='meta-key'>How to get:  </span>
                                        <span className='meta-value'>{ card.howToGet }</span>
                                    </div> )
                                : ('')
                                }
                                <hr />
                                <div className='hscard-artist meta-list meta-flavor'>
                                    {card.flavor.replace(/<\/?[bi]>/g, '*')} 
                                </div> 
                            </div>
                        </Tab>
                        <Tab eventKey={2} title="Stats">
                            <div className='card-block'>
                                <div className='hscard-format meta-list'>
                                        <span className='meta-key'>Format:  </span>
                                        <span className='meta-value'>{ card.format }</span>
                                </div>
                                <div className='hscard-cost meta-list'>
                                        <span className='meta-key'>Cost:  </span>
                                        <span className='meta-value'>{ card.cost }</span>
                                </div>
                                {(card.health)
                                ? (<div className='hscard-health meta-list'>
                                        <span className='meta-key'>Health:  </span>
                                        <span className='meta-value'>{ card.health }</span>
                                </div>)
                                : ''
                                }
                                {(card.attack)
                                ? (<div className='hscard-damage meta-list'>
                                        <span className='meta-key'>Attack:  </span>
                                        <span className='meta-value'>{ card.attack }</span>
                                </div>)
                                : ''
                                }
                                {(multiClass)
                                ?  ( <div className='hscard-artist meta-list'> 
                                        <span className='meta-key'>Classes:  </span>
                                        <span className='meta-value'>{ card.classes.toString().replace(/,/g, ', ') }</span>
                                    </div> )
                                :  ( <div className='hscard-artist meta-list'> 
                                        <span className='meta-key'>Class:  </span>
                                        <span className='meta-value'>{ card.playerClass }</span>
                                    </div> )
                                }
                                <div className='hscard-artist meta-list'> 
                                    <span className='meta-key'>Type:  </span>
                                    <span className='meta-value'>{ card.type }</span>
                                </div>
                                {(card.race)
                                ? (<div className='hscard-artist meta-list'> 
                                    <span className='meta-key'>Tribe:  </span>
                                    <span className='meta-value'>{ card.race }</span>
                                </div>) 
                                : ('')
                                }
                                {(card.text)
                                ? (
                                <div className='hscard-text meta-list'>
                                        <hr />
                                        <div className='meta-value' dangerouslySetInnerHTML={textHTML}/> 
                                </div>)
                                : ''
                                }
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        )
    }
}