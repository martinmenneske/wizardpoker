import React from "react";
import { Modal, ModalDialog, ModalHeader,
        ModalBody, ModalFooter, Tabs, Tab, Button } from "react-bootstrap";

export default class ModalAbout extends React.Component {

    render() {
        return (
            <Modal.Dialog>
                <Modal.Body>
                {/* <Tabs defaultActiveKey={1} id="about-tab-nav">
                    <Tab eventKey={1} title="About"> */}
                        <p>This was made by me, <a href="http://martinmenneske.no">Martin</a>, as a first endeavour into updating my
                        hopelessly ancient and outdated front-end skills &mdash; a project which is obviously still ongoing.</p>

                        <ul>
                            <li>The data for this site was made available by user <a href="https://market.mashape.com/omgvamp">omgvamp</a> at <a href="https://market.mashape.com/omgvamp/hearthstone">MashApe</a>.</li>
                            <li>The card images was collected and made available by <a href="https://github.com/schmich">Chris Schmich</a> and can be found <a href="https://github.com/schmich/hearthstone-card-images">here</a>.</li>
                        </ul>
                    {/* </Tab>
                    <Tab eventKey={2} title="Nerdy Stuff">
                        <strong>Things I did know something about when I set out.</strong>
                        <ul>
                            <li> Plain HTML, CSS and JavaScript. </li>
                            <li> A bit of SASS, a bit of LESS, a bit of CoffeeScript and the general idea of transpiling / postcombobulating code. </li>
                            <li> What an 'API' is. Well. More or less. </li>
                            <li> Enough of programming theory to know that I am not a very good programmer, if a programmer at all. </li>
                            <li> ... and enough to know that Object Oriented Programming apparently has gone out of style. </li>
                            <li> And of course a veritable cornucopia of handy and fascinating skills that are not relevant to this project, but which might be relevant to you if you are considering hiring me. <br /> I'd be happy to elaborate. Just ask. </li>
                        </ul>
                        <strong>Things I knew <em> nothing </em> about before starting and now know <em> something </em> about.</strong>
                        <ul>
                            <li> WebPack / Yarn / NPM / Package managers and task runners in general.</li>
                            <li> Node.js </li>
                            <li> ES6 / Babel / The fact that we can actually <em>do shit</em> like write next-gen JavaScript and have it work in browsers now. Wow! I'm still Flabberghasted! </li>
                            <li> React </li>
                            <li> BootStrap </li>
                        </ul>
                        <strong>Things I realize I need to learn more about, urgently:</strong>
                        <ul>
                            <li> Well, everything from the last list, obviously. But perhaps Webpack and it's plugin structure first. I have <em> no </em> idea how to make Webpack spit out an optimized an uglified build of my stuff. </li>
                            <li> SVG and CSS animation and some animation library like <a href="https://greensock.com/gsap">GSAP</a>. I'm not gonna be the brains of any operation I'm involved with, so I should probably learn to make things pretty. </li>
                            <li> UX. It's a field I'd like to get into. And a field where I imagine that knowing a bit of coding and a bit of design might be useful. </li>
                            <li> [ This space intentionally left blank ] - I am <em> very </em> open to suggestions. </li>
                        </ul>

                    </Tab>
                    </Tabs> */}
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.props.dismissHandler}>Close</Button>
                </Modal.Footer>

            </Modal.Dialog>
        )
    }
}