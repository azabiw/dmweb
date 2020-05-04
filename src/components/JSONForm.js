import React from "react";
import utilities from "./Utilities";
import {Form, Field} from "react-final-form";
import SimpleField from "./SimpleField";
import styles from "../styles/characterform.module.css";
import {Card, Segment, Grid, Button} from "semantic-ui-react";
import store from "../redux/Store";
import v4 from 'uuid/v4';
import {Link, Redirect} from "react-router-dom";
class JSONForm extends React.Component{
    #isNew = true;
    #id;
    constructor(props){
        let defaultCharacter = store.getState().editable;
        super(props);
        if (defaultCharacter !== []) this.isNew = false;
        console.log("is new tila: " + this.#isNew);
        this.state = {
            customFields: [],
            defaultCharacter: defaultCharacter,
            isNew: this.#isNew,
            redirect: false
        };
        let formFields = {
            name: "Character editor",
            label: "Character",
            fields: [
                {
                    name: "Name",
                    fieldType: "text"
                },
                {
                    name: "Class",
                    fieldType: "text"
                }
            ]
        }

        this.handleChange = this.handleChange.bind(this);
        store.subscribe(this.handleChange);
    }
    

    /**
     * 
     * @param {*} fieldData 
     */
    fieldGenerator(fieldData) {
        switch (fieldData.fieldType) {
            case "text":
                return <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "name")} name={fieldData.name} label={fieldData.name} />
            default: 
                return;
                
        }
        

    }

    handleChange() {
        let storeState = store.getState().editable;
        console.log("edit type in store" + storeState.editType);
        let isNew = false;
        if (storeState !== []) isNew = false;
        if (true || storeState.editType === "characters") { //todo: korjaa tyyppi
            this.setState({
                defaultCharacter: storeState,
                isNew: isNew
            });
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
                    console.log("is new tila : " + this.state.isNew);
                    utilities.handleFormData(formData,this.state.defaultCharacter, "character", "characters/add",this.state.isNew);
                    this.setState({redirect: true});
                } }>
                    {({handleSubmit}) => (
                        <form onSubmit={handleSubmit} id="inputForm">
                            <SimpleField id={"name"} defaultText={this.getDefault(this.state.defaultCharacter, "name")} name={"name"} label={"Name"}/>

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
                                this.setState({redirect: true}); //poistutaan sivulta.
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


export default JSONForm;