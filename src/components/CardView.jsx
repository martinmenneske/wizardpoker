import React from "react";
import CardImage from "./CardImage.jsx";
import CardMeta from "./CardMeta.jsx";
import { TweenMax, TimelineMax, Expo } from "gsap";

export default class CardView extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            cardData: this.props.cardData,
            preferGolden: this.props.preferGolden,
            animating: false
        }
        this.cardSwitchAnimator = this.cardSwitchAnimator.bind(this);
        this.flipIt = this.flipIt.bind(this);

    }
    
    cardSwitchAnimator() {
        /* 
         *  This is voodoo. I have not had time and opportunity
         *  to get acquainted with the GSAP-library yet, so this 
         *  is probably about as far from good practice as
         *  you can get. It works, so I'm keeping it.
        */
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
    
    flipIt() {
        this.setState({
            cardData: this.props.cardData
        });
    }

    componentWillReceiveProps ( nextProps ) {
        /* Pause component lifecycle flow until 
        *  UI animation is done. Then proceed.
        */
        if(nextProps.cardData != this.state.cardData) {
            this.setState({animating: true});
            this.cardSwitchAnimator();
        }
        if(nextProps.preferGolden != this.state.preferGolden) {
            this.setState({
                preferGolden: nextProps.preferGolden
            })
        }
    }

    render() {
        return (
            <div className="hscard-view" ref={div => { this.box = div; }}>
                <CardImage cardData={ this.state.cardData } preferGolden={ this.state.preferGolden } />
                <CardMeta  cardData={ this.state.cardData } />
            </div>
        )
    }
}