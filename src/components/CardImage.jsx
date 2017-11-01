import React from 'react';
import ImageLoader from 'react-load-image';


var imgSrc;
var imgClass;
var altTxt;

export default class CardImage extends React.Component {

    constructor( props ) {
        super( props );
        imgSrc = props.golden ? props.cardData.imgGold : props.cardData.imgAlt;
        imgClass = props.golden ? 'hscard-image golden' : 'hscard-image nongolden';
        altTxt = props.cardData.name;

        this.state = {
            imageSource: imgSrc,
            imageClass: imgClass,
            imageAltText: altTxt
        }
        
        this.errorHandler = this.errorHandler.bind(this);
        this.loadHandler = this.loadHandler.bind(this);
    }
    componentWillReceiveProps ( nextProps ){
        if(nextProps.cardData) {
            imgSrc = nextProps.golden ? nextProps.cardData.imgGold : nextProps.cardData.imgAlt;
            imgClass = nextProps.golden ? 'hscard-image golden' : 'hscard-image nongolden';
            altTxt = nextProps.cardData.name;
            this.setState({
                imageSource: imgSrc,
                imgClass: imgClass,
                imageAltText: altTxt
            })
        }

    }

    errorHandler ( err ) {
        console.log('CardImage Error: ' + err);
    }

    loadHandler( ev ) {
        //do something
    }
    render () {
        return (
            <div name='image-box' className='hscard-image-box' >
                <ImageLoader src={this.state.imageSource} onError={this.errorHandler} onLoad={this.loadHandler}> 
                            <img alt={this.state.imageAltText} className={this.state.imageClass} />
                            <div><img src={require('../assets/error_card_alt.png')} /></div>
                            <div className='hscard-image-placeholder'><img src={require('../assets/placeholder_card_alt.png')} />
                                <div className='image-load-svg'> <img src={require('../assets/svg-loaders/puff.svg')} /></div>
                            </div>
                </ImageLoader>
            </div>
        );
    }
}