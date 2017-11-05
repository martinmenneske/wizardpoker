import React from "react";
import ImageLoader from "react-load-image";

/*
* There's no valid reason for this component to exist,
* instead of just being another instance of CardImage,
* but it does *feeel* better to have it separated out...
*/
const CardThumb = ( props ) => {

    const altTxt = props.cardData.name;
    const imgSrc = props.cardData.imgAlt;
    
    const errorHandler = ( err ) => {
        console.log("CardThumb Error: " + err);
    }

    const loadHandler = ( ev ) => {
    //    do something
    }

    return (
        <div name="thumb-box" className="hscard-thumb-box" >
            <ImageLoader src={imgSrc} onError={errorHandler} onLoad={loadHandler}> 
                        <img alt={altTxt} className="hscard-thumb" />
                        <div><img src={require("../assets/error_card_alt.png")} /></div>
                        <div className="hscard-thumb-placeholder"><img src={require("../assets/placeholder_card_alt.png")} />
                            <div className="image-load-svg"> <img src={require("../assets/svg-loaders/puff.svg")} /></div>
                        </div>
            </ImageLoader>
        </div>
    );
}

export default CardThumb;