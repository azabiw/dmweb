import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AboutPage from "./AboutPage";
import Header from "./Header";
import styles from "../styles/Editor.module.css";
import HPCounter from "./HPCounter";
import Logbook from "./Logbook";
import FrontPage from "./FrontPage";
import Character from "./Character";
import Settlement from "./Settlement";
import Button from "@material-ui/core/Button";
import Footer from "./Footer";
import {Container, Grid, Rail, Segment} from "semantic-ui-react";
import HPCounterContainer from "./HPCounterContainer";
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
        this.changeEditor = this.changeEditor.bind(this); //vaaditaan, jotta this toimii oikein
        this.addCharacter = this.addCharacter.bind(this);
        this.editCharacter = this.editCharacter.bind(this);
        this.editProperty = this.editProperty.bind(this);
        this.addProperty = this.addProperty.bind(this);
    }

    /** TODO: KORJAA
     *
     * @param editor wanted editor
     */
    changeEditor(editor) {
        if ((editor !== null) && (typeof editor === "string")) {
            if(this.state.selected !== editor) {
                console.log("editor set to " + editor);
                this.setState({selected: editor});
            }
        }  else {
            if (this.state.selected === "character") {
                this.setState( {selected : "settlement"} );
            } else {
                this.setState( {selected : "character"} );
            }
        }

    }

    /**
     * Adds given character to main app's state.
     * @param character character to be added as app's state
     */
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
    }

    editProperty(name, formType ) {
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
            if (this.state.selected === "character" && formType === "settlements") this.setState({selected: "settlement"}); //todo muuta yleisempään muotoon
        }

    }

    /** Adds given character to be edited in editor;
     * todo: remove
     * @param characterName
     */
    editCharacter(characterName) {
        console.log("edit char clicked: "+ characterName);
        this.changeEditor("character");
        this.editProperty(characterName, "characters");
    }

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
        this.setState({characters : chars,
            settlements: settlements
        });
    }

    render() {
        return (
            <Container fluid>
                <Grid centered columns={2}>
                    <Grid.Column>
                        <PropertyList editProperty={this.editProperty} settlements={this.state.settlements} editCharacter={this.editCharacter} characters={this.state.characters} />
                        <Container><Editor addProperty={this.addProperty} editable={this.state.editable} addCharacter={this.addCharacter} selected={this.state.selected} characters={this.state.characters} settlements={this.state.settlements} /></Container>
                        <button onClick={this.changeEditor}>Change editor</button>
                    </Grid.Column>
                    <div>
                        <Logbook />
                        <Footer />
                    </div>
                </Grid>
            </Container>

        );

    }
} export default EditorPage;
//vaihtaa editoria valinnan mukaan
const Editor = (props) => {
    if (props.selected === "character") {
        return (
            <Character defaultCharacter={props.editable}  />
        )
    } else return <Settlement defaultValues={props.editable} addProperty={props.addProperty} characters={props.characters}/>
};
