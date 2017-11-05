import React from "react";

const AppLoaderMessage = (props) => {
    let text = props.text;

    return (
        <div className="loading-indicator">
            <div className="loading-text">
                {text}
            </div>
            <svg className="loader-spin" viewBox="0 0 100 100" width="100" xmlns="http://www.w3.org/2000/svg">
                <circle fill="lightgrey" cx="50" cy="50" r="20"/>
            </svg>
        </div>
    )
}
export default AppLoaderMessage;