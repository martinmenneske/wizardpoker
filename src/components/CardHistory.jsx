import React from 'react';
import ReactDOM from 'react-dom';
import { OverlayTrigger, Popover, Button } from 'react-bootstrap';

import CardImage from './CardImage.jsx';
import CardThumb from './CardThumb.jsx';

export default class CardHistory extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            cardHistory: this.props.cardHistory,
            count: 0
        }
    }

    componentWillReceiveProps ( nextProps ){
        let firstCount = this.state.count;
        let secondCount = 0;
    
        this.setState({
            count: this.state.cardHistory.length
        })
        // Delay needed to properly set state before 
        // reading state in function called
        var rndFnc = () => {
            secondCount = this.state.count;
            (secondCount > firstCount) ? this.onEnterAnimation(true) : this.onEnterAnimation(false);
         }
        setTimeout(function() { rndFnc() }, 10);
        
    }

    onEnterAnimation ( adding = true ) {

        let lis = document.getElementsByClassName('thumb-list-item');
            for (var i = 0; i < lis.length; i++) {
                var element = lis[i];
                    element.style.display = 'inline-block';
                }
        switch ( adding ) {
            case true:
                new TimelineMax()
                .set(this.box, {
                x: -124
                })
                .to(this.box, .5, {
                delay: .5,
                x: 0,
                ease: Expo.easeOut
                })
                break;
            case false:
                console.log('Nope!');
                
                break;
                
        }
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
                    scope.setState({ actionItem: i});
                    // Again: timeOut needed to deal with 
                    // delay setting state
                    var rndFnc = () => { 
                            scope.props.historyChangeHandler(i, false); 
                            }
                    setTimeout(function() { rndFnc() }, 100);
                    break;
                default:
                    break;
            }
            scope.refs[refName].hide();
        }

        return (
            <Popover className="history-popover" id="popover-positioned-top">
                <div>
                    <CardImage cardData={ item } />
                    <Button block onClick={()=> doClick('loadAgain')}>Reload</Button>
                    {/* <Button block onClick={()=> doClick('goBack')}>Go back</Button>  */}
                    <Button block onClick={()=> doClick('remove')}>Remove</Button>
                </div>
            </Popover>
        )
    }


    render () {
        return (
            <div className="scroll-box">
            <ul ref={ul => { this.box = ul; }}>
                {
                (this.state.cardHistory.length > 0)
                ? this.state.cardHistory.map((item,i) => <li id={'historyli-' + item.cardId } className="thumb-list-item fadein" key={i}>
                <OverlayTrigger ref={ item.name + i } 
                                trigger="click" 
                                placement="top" 
                                rootClose 
                                overlay={ this.createPopOver(item, i) }>
                    <div className="thumbnail-wrap">
                        <div className="thumbnail">
                            
                            {/* <a href="#" key={i} onClick={() => this.props.historyChangeHandler( i ) }>   */}
                                <CardThumb cardData={item} />
                            {/* </a> */}
                            
                        </div>
                    </div>
                    </OverlayTrigger>
                </li>)
                : <div className="empty-history-tray">
                    <h2 className="empty-history-legend">
                        Recently viewed cards...
                    </h2>
                </div>
                }
            </ul>
        </div>
        )
    }
}