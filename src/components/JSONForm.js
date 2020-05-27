import React from "react";
import utilities from "./Utilities";
import {Form} from "react-final-form";
import SimpleField from "./SimpleField";
import styles from "../styles/characterform.module.css";
import {Segment, Button, Label} from "semantic-ui-react";
import store from "../redux/Store";
import {Redirect} from "react-router-dom";
import SelectorField from "./SelectorField";

class JSONForm extends React.Component{
    #isNew = true;
    #id;
    constructor(props){
        let defaultValues = store.getState().editable;
        super(props); 
        this.state = {
            customFields: [],
            defaultValues: defaultValues,
            formFields: [],
            redirect: false,
            characters: store.getState().characters
        };
        /*let formFields = {
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
        }*/

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

        
        this.loadData();
        this.handleChange = this.handleChange.bind(this);
        this.handleAddFieldClick = this.handleAddFieldClick.bind(this);
        this.loadData = this.loadData.bind(this);
        store.subscribe(this.handleChange);
    }
    
async loadData() {
    let response = await fetch('/api', {
        credentials: "omit",
        cache: "no-store",
        method: "get"
    });
    let data = await response.json();
    let form = data[0]; //korjaa
    console.log(data);
    console.log("formdata", form);
    this.setState({formFields: form});
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
                let selectionType = fieldData.selectiontype ? fieldData.selectiontype : "characters";
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

    handleAddFieldClick(name) {
        let fields = this.state.formFields;
        console.log("formfields", fields);
        let empty = {
            "name": name,
            "fieldtype": "text",
            "selectionType": "",
            "value": ""
            }
                    
        fields.fields.push(empty);
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
    try {
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
    }    
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

const AddFieldContainer = (props) => {
    let textvalue = "";
    return (
        <div className={"addfieldContainer"}>
            <Label>
                Field name
                <input  id={"Fieldname"} onChange={
                    e => textvalue=e.target.value
                } />
            </Label>
            <Button  type="button" onClick={e => props.handleAddFieldClick(textvalue)}>Add a new field</Button>
        </div>
    )
}

export default JSONForm;
