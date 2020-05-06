import React from "react";
import utilities from "./Utilities";
import {Form} from "react-final-form";
import SimpleField from "./SimpleField";
import styles from "../styles/characterform.module.css";
import {Segment, Button} from "semantic-ui-react";
import store from "../redux/Store";
import {Redirect} from "react-router-dom";
import SelectorField from "./SelectorField";

class JSONForm extends React.Component{
    #isNew = true;
    #id;
    constructor(props){
        let defaultValues = store.getState().editable;
        super(props);
        if (defaultValues !== []) this.isNew = false;
        console.log("is new tila: " + this.#isNew);
        this.state = {
            customFields: [],
            defaultValues: defaultValues,
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

        let settlementEditorFields = {
            name: "Settlement editor",
            label: "Settlement",
            formType: "Settlement",
            fields: [
                {
                    name: "Name",
                    fieldType: "text"
                },
                {
                    name: "Leader",
                    fieldType: "selector",
                    selectionType:"character"
                },
                {
                    name: "Location",
                    fieldType: "text"
                },
                {
                    name: "Notable features",
                    fieldType: "text"
                },
                {
                    name: "Population and structure",
                    fieldType: "text"
                },
                {
                    name: "Level of security",
                    fieldType: "text"
                },
                {
                    name: "Organisations",
                    fieldType: "text"
                },
                {
                    name: "Interesting locations",
                    fieldType: "text"
                },
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
                return <SimpleField id={fieldData.name} defaultText={fieldData.value ? fieldData.value : ""} name={fieldData.name} label={fieldData.name} />
            case "selector":
                let selectionType = fieldData.selectionType ? fieldData.selectionType : "characters";
                let defaultValue = fieldData.value;
                return <SelectorField idOfDefault={defaultValue} properties={this.state[selectionType]} name={fieldData.name} label={fieldData.name} />
   
            default: 
                return;
                
        }
        

    }


   /**
   * 
   * @param {*} formData Array of forms's fields 
   */
    formFromJSON(formData){
        let fields = [];
        for (let field of formData.fields) {
            fields.push(this.fieldGenerator(field));
        }

        return fields;
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

        let jsonform = this.formFromJSON(formFields);
        return (
            <Segment className={styles.editor}>
                <h3>Edit NPC</h3>
                <Form onSubmit={(formData) => {
                    console.log("is new tila : " + this.state.isNew);
                    
                    let formType = this.props.formType ? this.props.formType : "character"; //käytetään vakioarvoja jos niitä ei oltu propsissa määritelty
                    let actionType = this.props.actionType ? this.props.actionType : "characters/add";
                    
                    utilities.handleFormData(formData,this.state.defaultCharacter, "character", "characters/add",this.state.isNew);

                    utilities.handleFormData(formData,this.state.defaultValues, formType, actionType ,this.state.isNew);
                    this.setState({redirect: true});
                } }>
                    {({handleSubmit}) => (
                        <form onSubmit={handleSubmit} id="inputForm">
                            <h2>{formFields.name}</h2>
                            {jsonform}
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
