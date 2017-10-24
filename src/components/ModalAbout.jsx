import React from 'react';
import { Modal, ModalDialog, ModalHeader,
        ModalBody, ModalFooter, Tabs, Tab, Button } from 'react-bootstrap';

export default class ModalAbout extends React.Component {

    render() {
        return (
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Meta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button bsStyle="primary" onClick={this.props.dismissHandler}>Close</Button>
                </Modal.Footer>

            </Modal.Dialog>
        )
    }
}