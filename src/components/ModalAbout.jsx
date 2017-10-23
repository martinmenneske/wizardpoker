import React from 'react';
import { Modal, ModalDialog, ModalHeader,
        ModalBody, ModalFooter, Button, Tabs, Tab } from 'react-bootstrap';

export default class ModalAbout extends React.Component {

    render() {
        return (
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Meta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Tabs defaultActiveKey={1} id="about-tab-modal">
                    <Tab eventKey={1} title="About">
                        <p>This was made by me, <a href="http://martinmenneske.no">Martin</a>, as a first endeavour into updating my
                        hopelessly ancient and outdated front-end skills – a project which is obviously still ongoing.</p>
                        <ul>
                            <li>
                                The API that this site depends on was made available by user <a href="https://market.mashape.com/omgvamp">omgvamp</a> at <a href="https://market.mashape.com/omgvamp/hearthstone">MashApe</a>.
                            </li>
                            <li>
                                The card images was collected and made available by <a href="https://github.com/schmich">Chris Schmich</a> and can be found <a href="https://github.com/schmich/hearthstone-card-images">here</a>.
                            </li>
                            <li>
                                The code for this site, warts and all, can be found <a href="https://github.com/martinmenneske/wizardpoker">here</a>.
                            </li>
                            <li> 
                                ... and if you have no idea what this is all about, you can find out about Hearthstone <a href="https://playhearthstone.com">here</a>. It's good fun.
                            </li>
                        </ul>
                        </Tab>
                        <Tab eventKey={2} title="Nerdy stuff">
                            <p>Made with the purpose of getting acquainted with <a href="https://reactjs.org/">React</a> and <a href="http://getbootstrap.com/">Bootstrap</a>. 
                            To be specific; a bastardly mix between vanilla Bootstrap and <a href="https://react-bootstrap.github.io/">React-Bootstrap</a>. 
                            Also, somewhat doggedly, made with bunch of <a href="http://sass-lang.com/">SCSS</a> in a heap of external files, because I'm 
                            not ready to accept the React-philosophy of inline-styles just yet.
                            </p>
                            <p>
                                I am currently very available for any opportunities in web development. 
                                If you want to hire me to do stuff like this (only better, faster and more frequently), <a href="mailto:martin.mg.jacobsen+jobs@gmail.com">get in touch</a>!
                                
                            </p>
                        </Tab>
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.props.dismissHandler}>Close</Button>
                </Modal.Footer>

            </Modal.Dialog>
        )
    }
}