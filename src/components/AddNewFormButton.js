import React from "react";
import { Button,  Modal, Label } from 'semantic-ui-react'
import {Link} from "react-router-dom";


class AddNewFormButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formtype:"character"
        }
        console.log("lisäämisnappi renderöity");
        this.onTypeChange = this.onTypeChange.bind(this);
    }
    
    onTypeChange(newType) {
        this.setState({formtype:newType});
    }

    render() {
        const typeOptions = ["character", "settlement"];
        let typeSelector = typeOptions.map(type => <option>{type}</option> );
        return (
        <React.Fragment>

                <Modal trigger={<Button primary>Add a New Form</Button>}>
                <Modal.Header>Add a New Form</Modal.Header>
                <Modal.Content >
                <Modal.Description>

                <Label>Select field type
                    <select value={this.state.formtype} onChange={e => this.onTypeChange(e.target.value)}>
                        {typeSelector}
                    </select>
                </Label>

                </Modal.Description>
                <Button as={Link} to="/editor/new" primary >Add a new Character</Button>

                </Modal.Content>
             </Modal> 
        </React.Fragment>   
        )
    }
}

export default AddNewFormButton;