import React from "react";
import { Modal, ModalDialog, ModalHeader,
        ModalBody, ModalFooter, Tabs, Tab, Button } from "react-bootstrap";

export default class ModalAbout extends React.Component {

    render() {
        return (
            <Modal.Dialog>
                <Modal.Body>
                <Tabs defaultActiveKey={1} id="about-tab-nav">
                    <Tab eventKey={1} title="About">
                        <p>This was made by me, <a href="http://martinmenneske.no">Martin</a>, as a first endeavour into updating my
                        hopelessly ancient and outdated front-end skills – a project which is obviously still ongoing.</p>

                        <ul>
                            <li>The data for this site was made available by user <a href="https://market.mashape.com/omgvamp">omgvamp</a> at <a href="https://market.mashape.com/omgvamp/hearthstone">MashApe</a>.</li>
                            <li>The card images was collected and made available by <a href="https://github.com/schmich">Chris Schmich</a> and can be found <a href="https://github.com/schmich/hearthstone-card-images">here</a>.</li>
                        </ul>
                    </Tab>
                    <Tab eventKey={2} title="Nerdy Stuff">
                        Sed non orci diam. Nullam pellentesque enim eget sollicitudin varius. Quisque vestibulum rutrum enim nec eleifend. 
                        Mauris porta scelerisque tortor vitae dictum. Phasellus mattis eget sapien eget pharetra. Sed efficitur leo 
                        consectetur velit posuere, at maximus augue dignissim. Suspendisse hendrerit tempor arcu, quis consectetur 
                        augue sollicitudin nec. Aliquam neque nisi, pharetra in ante sit amet, tincidunt dictum mauris. Maecenas sit 
                        amet ante porttitor dolor mollis vulputate ut nec mauris. Nulla elementum erat sodales felis tincidunt porttitor. 
                        Fusce urna ipsum, commodo in sem sed, vestibulum ultricies tortor. Sed imperdiet blandit ligula vitae congue.

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