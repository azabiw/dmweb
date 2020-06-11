import React from "react";
import utilities from "./Utilities";
import {Form} from "react-final-form";
import SimpleField from "./SimpleField";
import styles from "../styles/characterform.module.css";
import {Segment, Button, Label} from "semantic-ui-react";
import store from "../redux/Store";
import {Redirect} from "react-router-dom";
import SelectorField from "./SelectorField";
import AddFieldContainer from "./AddFieldContainer";
import { FormTemplate } from "../other/FormBase";
import * as firebase from "firebase";
class JSONForm extends React.Component{
    #isNew = true;
    #id;
    unsubscribe; //Tilauksen poistamiseen käytettävä funktio
    constructor(props){
        super(props); 
        const id = this.props.id;
        console.log(`Id${id}`);
        const isNew = this.props.isNew || false;
        let formFields = this.props.formFields || []; //jos propseina ei jostain syystä anneta lomakkeelle kenttiä, tehdään tyhjä lomake.
        if (!isNew) this.loadData(id);
        else {
            console.log("Creating a new form");
            if (formFields.length < 1) {
                formFields = new FormTemplate("name", "character", []);
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleAddFieldClick = this.handleAddFieldClick.bind(this);
        this.loadData = this.loadData.bind(this);

        this.unsubscribe = store.subscribe(this.handleChange);
        let characters = store.getState().characters;

        this.state = {
            customFields: [],
            formFields: formFields,
            redirect: false,
            characters: characters
        };

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

        console.log("list of chars ", store.getState());

    }

    
/**
 * Käsittelee komponentin elinkaaren lopun.
 * Poistaa redux-storen tilauksen.
 */
componentWillUnmount() {
    this.unsubscribe();
}



/**
 * Lataa palvelimelta annetulla id:llä vastaavasta lomakkeesta tilan. 
 * @param {*} id haettavan lomakkeen id
 */
async loadData(id) {
    const formID = id;
    let response = await fetch(`/api/${formID}`, {
        credentials: "omit",
        cache: "no-store",
        method: "get"
    });
    let data = await response.json();
    let form = data[0]; //korjaa
    console.log("data" , data);
    this.setState({formFields: data});
    return form;
}

    /**
     * 
     * @param {*} fieldData 
     */
    fieldGenerator(fieldData) {
        console.log("fielddata", fieldData);
        switch (fieldData.fieldtype) {
            case "text":
                return <SimpleField id={fieldData.name} defaultText={fieldData.value ? fieldData.value : ""} name={fieldData.name} label={fieldData.name} />
            case "selector":
                //let selectionType = fieldData.selectiontype ? fieldData.selectiontype : "characters";
                let defaultValue = fieldData.value;
                return <SelectorField idOfDefault={defaultValue} properties={this.state.properties} name={fieldData.name} label={fieldData.name} />
   
            default: 
                return;
                
        }
        

    }


   /**
   * 
   * @param {*} formData Array of forms's fields 
   */
    formFromJSON(formData){
        console.log("formdata", formData);

        if (formData === null || formData === undefined || formData["fields"] === undefined) return;
        let fields = [];
        for (let field of formData.fields) {
            fields.push(this.fieldGenerator(field));
        }
        console.log("created fields", fields);
        return fields;
    }

    handleChange() {

        let storeState = store.getState();
        let properties = storeState.characters;
        this.setState({properties : properties})
        /*let storeState = store.getState().editable;
        console.log("edit type in store" + storeState.editType);
        let isNew = false;
        if (storeState !== []) isNew = false;
        if (true || storeState.editType === "characters") { //todo: korjaa tyyppi
            this.setState({
                defaultCharacter: storeState,
                isNew: isNew
            });
        }*/
    }

    /**
     * Lisää lomakkeeseen uuden kentän annetulla nimellä ja tyypillä
     * @param {*} name Kentän nimi
     * @param {*} fieldType kentän tyyppi esim: "text" 
     */
    handleAddFieldClick(name, fieldType) {
        let fields = this.state.formFields || [];
        let selectionType = "";
        console.log("formfields", fields);
        if (fieldType !== "text") selectionType = fieldType;
        if (name === "") return; //ei lisätä tyhjää kenttää
        let empty = {
            "name": name,
            "fieldtype": fieldType,
            "selectionType": selectionType,
            "value": ""
            };
        console.log("Adding field with ", empty);
        fields["fields"].push(empty);
        this.setState({formFields: fields});
    }



/**
 * Lisää lomakeessa syötetyn arvon vastaavaan kenttään lomakkeen muodostamiseen käytettyyn tietorakenteeseen
 * @param {*} formData Lomakkeessa syötetyt arvot
 * @param {*} formFields lomakkeen muodostamiseen käytettävä tietorakenne.
 */
mapFormValueToField(formData, formFields) {
    for (let field of formFields.fields) {
        if (field.name === "name") {
            formFields.name = field.value;
            console.log("name set to: ", field.value);
        }

        field.value = formData[field.name];
    }
    return formFields
}

async handleSubmit(form, type, formFields) {
    const url = "/users";
    //let body = {};
    //0body["user"] = "testi";
    //body["formtype"] = type;
    let method = "post"; 
    console.log("form", form);
    console.log(formFields);
    formFields = this.mapFormValueToField(form,formFields);
    /*try {
        const response = await fetch(url, {
            method: method,
            body: JSON.stringify(formFields),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const json = await response.json();
        console.log('Success:', JSON.stringify(json));
    } catch (error) {
        console.error('Error:', error);
    }    */

    const db = firebase.firestore();
    const uid = store.getState().user;
    if (!uid) return; //TODO: parempi tapa 
        // Add a new document in collection "cities"
        let firebaseFriendlyForm = formFields.toFirebase();
    db.collection("users").doc(uid).set(firebaseFriendlyForm)
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

    
}

    render() {
        if (this.state.redirect === true) {
            return <Redirect to="/editor" />
        }
        let formFields = this.state.formFields;

        let jsonform = this.formFromJSON(this.state.formFields);

        return (
            <Segment className={styles.editor}>
                <h3>Edit NPC</h3>
                <Form onSubmit={(formData) => {
                    this.handleSubmit(formData, "character", formFields); //korjaa tyypin valinta
                    console.log(formData);                    
                } }>
                    {({handleSubmit}) => (
                        <form onSubmit={handleSubmit} id="inputForm">
                            <h2>{formFields.name}</h2>
                            {jsonform}
                            <AddFieldContainer handleAddFieldClick={this.handleAddFieldClick} />

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
