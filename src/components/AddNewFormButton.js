import React from "react";
import { Button,  Modal } from 'semantic-ui-react'
import {Link} from "react-router-dom";
import store from "../redux/Store";
import Helper from "./Helper";


/**
 * Käsittelee uuden lomakkeen lisäämisen
 */
class AddNewFormButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formtype:"character",
            typeOptions: ["character", "settlement"],
            newType: "",
            showNewTypeInput: false,
            isVisible: false
        }
        this.onTypeChange = this.onTypeChange.bind(this);
        this.onNewTypeChange = this.onNewTypeChange.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        this.handleClose = this.handleClose.bind(this);

    }
    handleOpen = () => this.setState({ isVisible: true })

    handleClose = () => this.setState({ isVisible: false })
  
    /**
     * Käsittelee tyypinvalitan dropdown valikon muutokset valmiiksi tunnetuille tyypeille
     * Jos tyyppinä on new muuttaa tilaa näyttämään input-kentän, johon käyttäjä voi lisätä oman tyypin.
     * 
     * @param {string} newType valmiiksi tunnettu tyyppi, joka on valittuna drop down -valikossa.
     */
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

                <Modal trigger={<Button onClick={this.handleOpen} primary>Add a New Form</Button>}
                        open={this.state.isVisible}
                        onClose={this.handleClose}
                >
                <Modal.Header>Add a New Form</Modal.Header>
                <Modal.Content >
                <Modal.Description>

                <label>Select form type
                    <select value={this.state.formtype} onChange={e => this.onTypeChange(e.target.value)}>
                        <option value="new">New Type</option>
                        {typeSelector}
                    </select>
                </label>
                <Helper hint="Sets the type of your new form. Form type is used to group forms by type and include forms in other forms" />
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
                        this.handleClose();
                }} as={Link} to="/editor/new" primary >Add a new Form</Button>

                </Modal.Content>
             </Modal> 
        </React.Fragment>   
        )
    }
}


/**
 * Uuden lomaketyypin lisäämiseen käytettävä komponentti
 * Propseina annettava visible määrittelee näkyvyyden
 */
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