import React from 'react';
import { Modal, ModalDialog, ModalHeader,
<<<<<<< HEAD
        ModalBody, ModalFooter, Tabs, Tab, Button } from 'react-bootstrap';
=======
        ModalBody, ModalFooter, Button, Tabs, Tab } from 'react-bootstrap';
>>>>>>> 8983d508b8f03128898941378e288a6568528c0f

export default class ModalAbout extends React.Component {

    render() {
        return (
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Meta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
<<<<<<< HEAD
                <Tabs defaultActiveKey={1} id="about-tab-nav">
                    <Tab eventKey={1} title="About">
                        <p>This was made by me, <a href="http://martinmenneske.no">Martin</a>, as a first endeavour into updating my
                        hopelessly ancient and outdated front-end skills – a project which is obviously still on.</p>

                        <ul>
                            <li>The data for this site was made available by user <a href="https://market.mashape.com/omgvamp">omgvamp</a> at <a href="https://market.mashape.com/omgvamp/hearthstone">MashApe</a>.</li>
                            <li>The card images was collected and made available by <a href="https://github.com/schmich">Chris Schmich</a> and can be found <a href="https://github.com/schmich/hearthstone-card-images">here</a>.</li>
                        </ul>
                    </Tab>
                    <Tab eventKey={2} title="Nerdy Stuff">
                    Nullam aliquet a diam et gravida. Ut vel justo fermentum dolor congue venenatis nec at ligula. 
                    Nullam blandit eu lectus vitae congue. Nulla eget tincidunt leo. Phasellus vitae sollicitudin turpis. 
                    Sed luctus, lacus quis egestas pharetra, lacus velit consectetur turpis, ac posuere felis ante et justo. 
                    Sed malesuada massa tempor mi ullamcorper, vitae placerat massa egestas. 
                    Aliquam at interdum mauris, quis tristique purus. Proin dapibus sollicitudin bibendum. 
                    Pellentesque id purus viverra, dignissim neque et, viverra tellus. Suspendisse et feugiat lorem.
                    Mauris sapien velit, blandit eget tellus ut, aliquam pretium mi. Curabitur ultricies nulla nunc, 
                    nec sodales eros scelerisque quis.
                    </Tab>
=======
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
>>>>>>> 8983d508b8f03128898941378e288a6568528c0f
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.props.dismissHandler}>Close</Button>
                </Modal.Footer>

            </Modal.Dialog>
        )
    }
}