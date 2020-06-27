import React from "react";
import { Button,  Modal } from 'semantic-ui-react'
import {Link} from "react-router-dom";
import store from "../redux/Store";


class AddNewFormButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formtype:"character",
            typeOptions: ["character", "settlement"],
            newType: "",
            showNewTypeInput: false
        }
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onNewTypeChange = this.onNewTypeChange.bind(this);

    }
    
    onTypeChange(newType) {
        let showNewTypeInput = false;
        if (newType === "new") {
            showNewTypeInput = true;
        }       
        this.setState({
            formtype:newType,
            showNewTypeInput: showNewTypeInput
        });

    }

    onNewTypeChange(value) {
        this.setState({
            newType: value
        });
    }

    render() {
        let typeSelector = this.state.typeOptions.map(type => <option>{type}</option> );
        return (
        <React.Fragment>

                <Modal trigger={<Button primary>Add a New Form</Button>}>
                <Modal.Header>Add a New Form</Modal.Header>
                <Modal.Content >
                <Modal.Description>

                <label>Select field type
                    <select value={this.state.formtype} onChange={e => this.onTypeChange(e.target.value)}>
                        <option value="new">New Type</option>
                        {typeSelector}
                    </select>
                </label>

                <NewTypeInput value={this.state.newType} visible={this.state.showNewTypeInput} onChange={this.onNewTypeChange}/>

                </Modal.Description>
                <Button onClick={
                    event => {
                        let type = this.state.formtype;
                        if(this.state.newType !== "") type = this.state.newType;
                        store.dispatch({
                            type: "formtype/set",
                            payload: type
                        })
                }} as={Link} to="/editor/new" primary >Add a new Form</Button>

                </Modal.Content>
             </Modal> 
        </React.Fragment>   
        )
    }
}

class NewTypeInput extends React.Component {

    render() {
        if (!this.props.visible) {
            return <React.Fragment></React.Fragment>
        } else {
           return <React.Fragment>
            New form type: 
            <input value={this.props.value} onChange={event => this.props.onChange(event.target.value)} type="text" placeholder="New form type" ></input>
            </React.Fragment> 

        }
    }

}
export default AddNewFormButton;