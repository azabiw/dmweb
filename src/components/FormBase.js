import React from "react";
import utilities from "./Utilities";
import {Form, Field} from "react-final-form";
import SimpleField from "./SimpleField";
import styles from "../styles/characterform.module.css";
import {Card, Segment, Grid, Button} from "semantic-ui-react";
import store from "../redux/Store";
import v4 from 'uuid/v4';
import {Link, Redirect} from "react-router-dom";
class Character extends React.Component{
    #isNew = true;
    constructor(props){
        let defaultValues = store.getState().editable;
        super(props);
        if (defaultValues !== []) this.isNew = false;
        this.state = {
            customFields: [],
            defaultCharacter: defaultValues,
            redirect: false
        };
        this.handleChange = this.handleChange.bind(this);
        store.subscribe(this.handleChange);
    }


    handleChange() {
        let storeState = store.getState().editable;
        console.log("edit type in store" + storeState.editType);
        if (true || storeState.editType === "characters") { //todo: korjaa tyyppi
            this.setState({defaultValues: storeState});
        }
    }

    //palauttaa vakioarvon NPC:n ominaisuudelle.
    getDefault(defaults, attribute) {
        if (defaults[attribute] != null) {
            return defaults[attribute];
        }
        else {
            return "";
        }
    }
    render() {
        if (this.state.redirect === true) {
            return <Redirect to="/editor" />
        }
        return (
            <Segment className={styles.editor}>
                <h3>Edit NPC</h3>
                <Form onSubmit={(formData) => {
                    utilities.handleFormData(formData,this.state.defaultValues, "character", "characters/add",this.#isNew);
                    this.setState({redirect: true});
                } }>
                    {({handleSubmit}) => (
                        <form onSubmit={handleSubmit} id="inputForm">
                            {this.props.children}
                            <Button type="submit" primary>
                                Save
                            </Button>
                            <Button type="button" onClick={event => {
                                let util = new utilities();
                                let name = document.getElementById("name").value;
                                console.log(name);
                                let charToDelete = {
                                    name: name
                                };
                                util.sendToServer(charToDelete,"DELETE");
                                utilities.initializeStore();
                            }}  color="red">
                                Remove
                            </Button>
                        </form>
                    )}
                </Form>
            </Segment>
        )
    }
}


export default Character;
