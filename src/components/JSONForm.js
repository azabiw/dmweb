import React from "react";
import {Form} from "react-final-form";
import SimpleField from "./SimpleField";
import styles from "../styles/characterform.module.css";
import {Segment, Button} from "semantic-ui-react";
import store from "../redux/Store";
import {Redirect} from "react-router-dom";
import SelectorField from "./SelectorField";
import AddFieldContainer from "./AddFieldContainer";
import { FormTemplate } from "../other/FormBase";
import * as firebase from "firebase";
import { v4 } from "uuid";
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
        const formtype = store.getState().currentFormtype;
        if (!isNew) this.loadData(id);
        else {
            console.log("Creating a new form");
            if (formFields.length < 1) {
                formFields = new FormTemplate("name", formtype, []);
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleAddFieldClick = this.handleAddFieldClick.bind(this);
        this.loadData = this.loadData.bind(this);

        this.unsubscribe = store.subscribe(this.handleChange);
        let character = store.getState().character;
        this.state = {
            formFields: formFields,
            redirect: false,
            character: character,
            formtype: formtype
        };


    }

    
/**
 * Käsittelee komponentin elinkaaren lopun.
 * Poistaa redux-storen tilauksen.
 */
componentWillUnmount() {
    this.setState({formFields: []});
    this.unsubscribe();
}



/**
 * Lataa palvelimelta annetulla id:llä vastaavasta lomakkeesta tilan. 
 * @param {*} id haettavan lomakkeen id
 */
async loadData(id) {
    /*const formID = id;
    let response = await fetch(`/api/${formID}`, {
        credentials: "omit",
        cache: "no-store",
        method: "get"
    });
    let data = await response.json();
    let form = data[0]; //korjaa
    console.log("data" , data);*/

    const db = firebase.firestore();
    const uid = store.getState().user;
    if (!uid) return; //TODO: parempi tapa 
        // Add a new document in collection "cities"
    db.collection("users").doc(uid).collection("forms").where("id", "==", id).get()
    .then(querySnapshot =>  {
        querySnapshot.forEach(doc => {
            this.setState({formFields: doc.data()});
            console.log("Document found!");

        }) 

    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

   
   // return form;
}

    /**
     * 
     * @param {*} fieldData 
     */
    fieldGenerator(fieldData) {
        //console.log("fielddata", fieldData);
        switch (fieldData.fieldtype) {
            case "text":
                return <SimpleField id={fieldData.name} defaultText={fieldData.value ? fieldData.value : ""} name={fieldData.name} label={fieldData.name} />
            case "selector":
                let defaultValue = fieldData.value;
                return <SelectorField idOfDefault={defaultValue} properties={this.state.character} name={fieldData.name} label={fieldData.name} />
   
            default: 
                return;
                
        }
        

    }


   /**
   * 
   * @param {*} formData Array of forms's fields 
   */
    formFromJSON(formData){
       // console.log("formdata", formData);

        if (formData === null || formData === undefined || formData["fields"] === undefined) return;
        let fields = [];
        for (let field of formData.fields) {
            fields.push(this.fieldGenerator(field));
        }
       // console.log("created fields", fields);
        return fields;
    }

    handleChange() {

        let storeState = store.getState().forms;
        const formtype = storeState.currentFormtype;
        const properties = storeState.character;
        this.setState({
            character : properties,
            formtype: formtype
        });
    }

    /**
     * Lisää lomakkeeseen uuden kentän annetulla nimellä ja tyypillä
     * @param {*} name Kentän nimi
     * @param {*} fieldType kentän tyyppi esim: "text" 
     */
    handleAddFieldClick(name, fieldType) {
        let fields = this.state.formFields || [];
        let selectionType = "";
        //console.log("formfields", fields);
        if (fieldType !== "text") selectionType = fieldType;
        let testForNumbers = parseInt(name);
        if (name === "" || !isNaN(testForNumbers)){ //estetään sopimattoman tyyppisten kenttien lisääminen
            console.log("Incorrect field name");
            return; //ei lisätä tyhjää kenttää
        } 
        
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
        field.value = formData[field.name];

        if (field.name === "name") {
            formFields["name"] = field.value;
            console.log("name set to: ", field.value);
        }

    }

    return formFields
}

async handleSubmit(form, type, formFields) {
    console.log("form", form);
    console.log(formFields);
    formFields = this.mapFormValueToField(form,formFields);
    if (!formFields["id"]) formFields["id"] = this.props.id || v4(); //jos ID:tä ei annettu propseina asetetaan v4 UUID 

    const db = firebase.firestore();
    const uid = store.getState().user;
    if (!uid) return; //TODO: parempi tapa 
        // Add a new document in collection "cities"
    let firebaseFriendlyForm;
    try { //uusi lomake
        firebaseFriendlyForm = formFields.toFirebase();
        firebaseFriendlyForm.formtype = store.getState().currentFormtype; //asetetaan lomakkeen tyyppi vastaamaan storessa olevaa tyyppiä TODO: tee parempi tapa

    } catch (e) {  //vanha lomake
        console.log("error ", e);
        firebaseFriendlyForm = formFields;
    }
    db.collection("users").doc(uid).collection("forms").doc(formFields["id"]).set(firebaseFriendlyForm)
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

    store.dispatch({
        type: "form/add",
        payload: firebaseFriendlyForm
    });
    
}

removeForm(id, type) {
    const db = firebase.firestore();
    const uid = store.getState().user;
    if (!uid) return; //TODO: parempi tapa 
    store.dispatch({
        type: "form/remove",
        payload: {
            type, 
            id
        }
    })
    db.collection("users").doc(uid).collection("forms").doc(id).delete().then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    }).finally(e => {
        this.setState({redirect: true}); //poistutaan sivulta.
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
                    this.handleSubmit(formData, this.state.formtype, formFields); //korjaa tyypin valinta
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
                                this.removeForm(this.props.id, this.state.formtype)
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
