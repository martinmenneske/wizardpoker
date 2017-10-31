import React from 'react';
import ImageLoader from 'react-load-image';


const CardImage = ( props ) => {

    const imgSrc = props.golden ? props.cardData.imgGold : props.cardData.imgAlt;
    const imgClass = props.golden ? 'hscard-image golden' : 'hscard-image nongolden';
    const altTxt = props.cardData.name;

    const errorHandler = ( err ) => {
        console.log('CardImage Error: ' + err);
    }

    const loadHandler = ( ev ) => {
        //do something
    }

    return (
        <div name='image-box' className='hscard-image-box' >
            <ImageLoader src={imgSrc} onError={errorHandler} onLoad={loadHandler}> 
                        <img alt={altTxt} className={imgClass} />
                        <div><img src={require('../assets/error_card_alt.png')} /></div>
                        <div className='hscard-image-placeholder'><img src={require('../assets/placeholder_card_alt.png')} />
                            <div className='image-load-svg'> <img src={require('../assets/svg-loaders/puff.svg')} /></div>
                        </div>
            </ImageLoader>
        </div>
    );
}

export default CardImage;