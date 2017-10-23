import React from 'react';
import { Modal, ModalDialog, ModalHeader,
        ModalBody, ModalFooter, Button } from 'react-bootstrap';

export default class ModalAbout extends React.Component {

    render() {
        return (
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Meta</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <p>This was made by me, <a href="http://martinmenneske.no">Martin</a>, as a first endeavour into updating my
                    hopelessly ancient and outdated front-end skills – a project which is obviously still on.</p>

                    <ul>
                        <li>The data for this site was made available by user <a href="https://market.mashape.com/omgvamp">omgvamp</a> at <a href="https://market.mashape.com/omgvamp/hearthstone">MashApe</a>.</li>
                        <li>The card images was collected and made available by <a href="https://github.com/schmich">Chris Schmich</a> and can be found <a href="https://github.com/schmich/hearthstone-card-images">here</a>.</li>
                    </ul>
                </Modal.Body>

                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.props.dismissHandler}>Close</Button>
                </Modal.Footer>

            </Modal.Dialog>
        )
    }
}