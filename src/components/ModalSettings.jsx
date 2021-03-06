import React from "react";
import { Modal, ModalDialog, ModalHeader,ModalBody, ModalFooter, 
        Button, ButtonToolbar, ToggleButtonGroup, ToggleButton,
        Grid, Row, Col} from "react-bootstrap";




export default class ModalSettings extends React.Component {
    constructor( props ) {
        super( props );

        this.state = { 
                saveStateLocal: this.props.saveStateLocal,
                preferGolden: this.props.preferGolden
            }
        this.setSaveStateLocal = this.setSaveStateLocal.bind(this);
        this.setPreferGolden = this.setPreferGolden.bind(this);

        this.saveAndClose = this.saveAndClose.bind(this);
        this.loadFirst = this.loadFirst.bind(this);

    }
    
    setSaveStateLocal ( value ) {
        this.setState({
            saveStateLocal: value
        })
    }
    setPreferGolden ( value ){        
        this.setState({
            preferGolden: value
        })
        
        
    }
    loadFirst() {
        this.props.goToFirst({target: {
            name: "resetBtn"
        }});
    }

    saveAndClose() {
        /* Leaving this nugget to serve as a reminder that this
        * is no way to live, and that I must find a better solution.
        *    console.log(`
        *         ModalSettings is sending up: 
        *         this.state.saveStateLocal: ${this.state.saveStateLocal}
        *         this.state.preferGolden: ${this.state.preferGolden}
        *     `);
        */
        this.props.saveHandler(this.state.saveStateLocal, this.state.preferGolden);
    }
    
    componentWillReceiveProps (nextProps) {

    }

    render () {
        return (
            <Modal.Dialog>
                <Modal.Header>
                    <Modal.Title>Settings</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                        <table>
                            <tbody>
                                <tr> 
                                    <td className="settings-text">
                                        <strong>Want a cookie?</strong> <br />
                                        Would you like us to remember your last viewed cards for next time? 
                                    </td>
                                    <td className="settings-controls">
                                    <ToggleButtonGroup
                                        type="radio"
                                        name="save-state-mode"
                                        value={this.state.saveStateLocal}
                                        onChange={this.setSaveStateLocal}>
                                            <ToggleButton value={true}>Sure!</ToggleButton>
                                            <ToggleButton value={false}>No, thanks</ToggleButton>
                                    </ToggleButtonGroup>
                                    </td>
                                </tr>
                                <tr> 
                                    <td className="settings-text">
                                        <strong>How about a cake?</strong> <br /> <strong><em style={{color: "salmon"}}>
                                        Currently not available.</em></strong><br />
                                        Would you like to store a copy of the card-data to speed up loading this page? 
                                    </td>
                                    <td className="settings-controls">
                                    <ToggleButtonGroup
                                        type="radio"
                                        name="store-mode">
                                            <ToggleButton disabled value={true}>Hit me!</ToggleButton>
                                            <ToggleButton disabled value={false}>No wai!</ToggleButton>
                                    </ToggleButtonGroup>
                                    </td>
                            </tr>
                            <tr> 
                                <td className="settings-text">
                                    <strong>Bling!</strong> <br /> 
                                    <strong><em style={{color: "darkorange"}}>Images might load slowly, or not at all.</em></strong><br />
                                        The provider for golden cards is pretty unreliable and slow. 
                                        Would you still like to try loading golden cards?
                                    </td>
                                    <td className="settings-controls">
                                    <ToggleButtonGroup
                                        type="radio"
                                        name="prefer-golden-mode"
                                        value={this.state.preferGolden}
                                        onChange={this.setPreferGolden}>
                                            <ToggleButton value={true}>Bling!</ToggleButton>
                                            <ToggleButton value={false}>Nope!</ToggleButton>
                                    </ToggleButtonGroup>
                                </td>
                            </tr>
                            <tr> 
                                <td className="settings-text">
                                    <strong>Start at the beginning.</strong> <br />
                                    For completionists and other crazy people. <br />
                                        There"s really no other way of deciding what is "the beginning" other than the order the cards appear in the database. Want to load up the very first card?
                                    </td>
                                    <td className="settings-controls">
                                        <Button bsSize="large" onClick={this.loadFirst}> Hit me! </Button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.dismissHandler}>Close</Button>
                    <Button bsStyle="primary" onClick={this.saveAndClose}>Save changes</Button>
                </Modal.Footer>
            </Modal.Dialog>
        )
    }
}