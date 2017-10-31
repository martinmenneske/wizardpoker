import React from "react";

const AppLoaderMessage = (props) => {
    // let text = props.text;

    let rndText = [
        "By Jove!",
        "Hot diggity!",
        "Discombobulating bobules",
        "Hit'em up, hit'em up!",
        "Holy formulaic meme construct, Batman!",
        "Reticulating splines.",
        "Making it better, better ,better!",
        "Fix0ring shizznizz."
    ];

    let misQuotes = [
        "No, I am your father. <br /> – Mr. Vader.",
        "Play it Sam. You played it for her, you can play it for me. <br /> – Mr. Bogart.",
        "Let them eat brioche. <br /> – HRH Antoinette",
        "Toto. I've a feeling we're not in Kansas anymore. <br />  – Ms. Dorothy",
        "You've got to ask yourself one question. Do I feel lucky? Well, do ya, punk? <br />  – Mr. Harry.",
        "It's alive! <br />  – Dr. Frankenstein.",
        "Jane. Tarzan. Jane. Tarzan! <br /> – Lord John Clayton III, Viscount Greystoke.",
        "Magic Mirror on the Wall, who is the Fairest one of all? <br /> – Mrs. Witch, Wicked.",
        "Made it, Ma. Top of the world! <br /> – Mr. Cagney.",
        "The Force will be with you … always. <br /> – Mr. Kenobi.",
        "Badges? We ain’t got no badges. We don’t need no badges. I don’t have to show you any stinkin’ badges! <br /> – Mr. Goldhat.",
        "My father made him an offer he couldn't refuse. <br /> Mr. Corleone, Michael."
        ];

    let text = misQuotes[ Math.floor ( Math.random() * misQuotes.length ) ];

    return (
        <div className="loading-indicator">
            <div className="loading-text" dangerouslySetInnerHTML={{__html: text}} />
            <svg className="loader-spin" viewBox="0 0 100 100" width="100" xmlns="http://www.w3.org/2000/svg">
                <circle fill="lightgrey" cx="50" cy="50" r="20"/>
            </svg>
        </div>
    )
}

export default AppLoaderMessage;