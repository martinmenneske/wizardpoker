import React from 'react';
import ImageLoader from 'react-load-image';


const CardThumb = ( props ) => {

    const altTxt = props.cardData.name;
    const imgSrc = props.golden ? props.cardData.imgGold : props.cardData.imgAlt;
    
    const errorHandler = ( err ) => {
        console.log('CardThumb Error: ' + err);
    }

    const loadHandler = ( ev ) => {
    //    console.log('Image loaded!')
    }

    return (
        <div name='thumb-box' className='hscard-thumb-box' >
            <ImageLoader src={imgSrc} onError={errorHandler} onLoad={loadHandler}> 
                        <img alt={altTxt} className='hscard-thumb' />
                        <div><img src={require('../assets/error_card_alt.png')} /></div>
                        <div className='hscard-thumb-placeholder'><img src={require('../assets/placeholder_card_alt.png')} />
                            <div className='image-load-svg'> <img src={require('../assets/svg-loaders/puff.svg')} /></div>
                        </div>
            </ImageLoader>
        </div>
    );
}

export default CardThumb;