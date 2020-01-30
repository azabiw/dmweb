import React from "react";
import Logbook from "./Logbook";
import Character from "./Character";
import Settlement from "./Settlement";
import Footer from "./Footer";
import {Container, Grid, Rail, Segment} from "semantic-ui-react";
import store from "../redux/Store";
import PropertyList from "./PropertyList";

class EditorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "character",
            characters: [],
            settlements: [],
            editable: ""
        }; //Valittu editori
        //this.changeEditor = this.changeEditor.bind(this); //vaaditaan, jotta this toimii oikein
       /* this.addCharacter = this.addCharacter.bind(this);
        this.editCharacter = this.editCharacter.bind(this);
        this.editProperty = this.editProperty.bind(this);
        this.addProperty = this.addProperty.bind(this); */
    }
/*
    /**
     * Adds given character to main app's state.
     * @param character character to be added as app's state

    addCharacter(character) {
        let newCharacters = this.state.characters;
        if(this.state.editable !== "") {
            for (let char of newCharacters) {
                if (char.name === character.name) {
                    char = character;
                    console.log("old char edited ");
                }
            }
        } else {
            newCharacters.push(character);
        }

        this.setState({characters: newCharacters});
        console.log("hahmo lisätty");
    }


    addProperty(property, type) {
        let newProperties = this.state[type];
        if(this.state.editable !== "") {
            for (let prop of newProperties) {
                if (prop.name === property.name) {
                    prop = property;
                    console.log("old property edited ");
                }
            }
        } else {
            newProperties.push(property);
        }
        let newState = {};
        newState[type] = newProperties;
        this.setState(newState);
        console.log("lisätty" + property + "type: " + type);
    }*/

/*
    editProperty(name, formType ) {
        console.log(name);
        if(name === "") {
            this.setState({editable: ""});
            return;
        }
        let arrays = this.state[formType];
        let selectedProperty;
        for (let char of arrays) { //haetaan hahmoista lisättävä hahmo
            console.log("char name" + char.name);
            if (char.name === name) {
                selectedProperty = char;
                break;
            }
        }
        if (selectedProperty != null) {
            this.setState({editable: selectedProperty});
            store.dispatch({type: "editable/set", payload: {
                    editable: selectedProperty,
                    editType: "formType"
                }});

            if (this.state.selected === "character" && formType === "settlements") this.setState({selected: "settlement"}); //todo muuta yleisempään muotoon
        }

    }
*/
    /** Adds given character to be edited in editor;
     * todo: remove
     * @param characterName
     *//*
    editCharacter(characterName) {
        console.log("edit char clicked: "+ characterName);
        //this.changeEditor("character");
        this.editProperty(characterName, "characters");
    }
*/

    /**
     * Fetches all user's data from server and saves them to corresponding states
     * @returns {Promise<void>}
     */
    async componentDidMount() {

        let response = await fetch('/users', {
            credentials: "omit",
            cache: "no-store",
            method: "get"
        });
        let data = await response.json();
        console.log(data);
        let chars = [];     //hakee palvelimelta kaikki käyttäjän kaupungit ja hahmot
        let settlements = [];
        let logs = [];
        for (let i = 0; i < data.length; i++) {
            let char = data[i]["data"]; //lisätään lomake vastavaan listaan
            switch (data[i].type) {
                case "character":
                    chars.push(char);
                    break;
                case "settlement":
                    settlements.push(char);
                    break;
                default: return;
            }

        }
        store.dispatch({type:"initialise",
        payload: {
            characters: chars,
            settlements: settlements,
            logs: logs,
        }});
    }

    render() {
        return (
            <Container fluid>
                <Grid centered columns={2}>
                    <Grid.Column>
                        <PropertyList />
                        <Container>{
                           this.props.children
                        }</Container>
                    </Grid.Column>
                    <div>
                        <Footer />
                    </div>
                </Grid>
            </Container>

        );

    }
} export default EditorPage;
