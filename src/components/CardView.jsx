import React from 'react';
import CardImage from './CardImage.jsx';
import CardMeta from './CardMeta.jsx';
import { TweenMax, TimelineMax, Expo } from 'gsap';

export default class CardView extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            cardData: this.props.cardData,
            animating: false
        }
        this.animYo = this.cardSwitchAnimator.bind(this);
        this.flipIt = this.flipIt.bind(this);

    }

    componentWillMount ( whatevs ) {
        console.log('About to mount, baby!');
        
    }

    flipIt() {
        this.setState({
            cardData: this.props.cardData
        });
    }

    cardSwitchAnimator() {
        if (!this.state.animating) {
            new TimelineMax()
                .to(this.box, .5, {
                scale:.9,
                opacity: 0,
                ease: Expo.easeIn,
                onComplete: () => { this.flipIt() }
                })
                .set(this.box, {
                scale:1.1,
                opacity: 0
                })
                .to(this.box, .5, {
                scale: 1,
                opacity: 1,
                ease: Expo.easeOut
                })
                .call(() => this.setState({ animating: false }))
            } else {
                return;
            }   
    }

    componentWillReceiveProps ( nextProps ) {
        if(nextProps.cardData != this.state.cardData) {
            this.setState({animating: true});
            this.cardSwitchAnimator();
        }
    }

    render() {
        return (
            <div className="hscard-view" ref={div => { this.box = div; }}>
                <CardImage cardData={ this.state.cardData } golden={ this.props.preferGolden } />
                <CardMeta  cardData={ this.state.cardData } />
            </div>
        )
    }
}