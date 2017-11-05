import React from "react";
import ImageLoader from "react-load-image";


var imgSrc;
var imgClass;
var altTxt;

export default class CardImage extends React.Component {

    constructor( props ) {
        super( props );

        imgSrc = props.preferGolden ? props.cardData.imgGold : props.cardData.imgAlt;
        imgClass = props.preferGolden ? "hscard-image golden" : "hscard-image nongolden";
        altTxt = props.cardData.name;
        
        this.state = {
            imageSource: imgSrc,
            imageClass: imgClass,
            imageAltText: altTxt,
            preferGolden: props.preferGolden
        }
        
        this.errorHandler = this.errorHandler.bind(this);
        this.loadHandler = this.loadHandler.bind(this);
    }
    componentWillReceiveProps ( nextProps ){
        /* This all feels bad and needs looking at. */
        
        if(nextProps.cardData) {
            imgSrc = (nextProps.preferGolden) ? nextProps.cardData.imgGold : nextProps.cardData.imgAlt;
            imgClass = (nextProps.preferGolden) ? "hscard-image golden" : "hscard-image nongolden";
            altTxt = nextProps.cardData.name;
            this.setState({
                imageSource: imgSrc,
                imgClass: imgClass,
                imageAltText: altTxt
            });
        }

        if(nextProps.preferGolden != this.state.preferGolden) {
            console.log(`
            CardImage is receiving: 
            this.state.preferGolden: ${nextProps.preferGolden}
            `);
            imgClass = nextProps.preferGolden ? "hscard-image golden" : "hscard-image nongolden";
            this.setState({
                preferGolden: nextProps.preferGolden,
                imageClass: imgClass
            })
        }

    }

    errorHandler ( err ) {
        console.log("CardImage Error: " + err);
    }

    loadHandler( ev ) {
        /* A bit of brute force here since the html-classes seem a bit wonky about updating properly */        
        imgClass = (this.state.preferGolden) ? "hscard-image golden" : "hscard-image nongolden";
    }

    render () {
        return (
            <div name="image-box" className="hscard-image-box" >
                <ImageLoader src={ this.state.imageSource } onError={ this.errorHandler } onLoad={ this.loadHandler }> 
                            <img id="hscard-loaded" alt={ this.state.imageAltText } className={ this.state.imageClass } />
                            <div><img src={require("../assets/error_card_alt.png")} /></div>
                            <div className="hscard-image-placeholder"><img src={require("../assets/placeholder_card_alt.png")} />
                                <div className="image-load-svg"> <img src={require("../assets/svg-loaders/puff.svg")} /></div>
                            </div>
                </ImageLoader>
            </div>
        );
    }
}