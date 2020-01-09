import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import AboutPage from "./AboutPage";
import Header from "./Header";
import Grid from "@material-ui/core/Grid";
import styles from "../styles/Editor.module.css";
import HPCounter from "./HPCounter";
import Logbook from "./Logbook";
import FrontPage from "./FrontPage";
import Character from "./Character";
import Settlement from "./Settlement";
import Button from "@material-ui/core/Button";
import Footer from "./Footer";

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
            <div className="App">
                <Grid className={styles.GridContainer} container spacing={2}>
                    <Grid item xs={12}>
                    </Grid>
                    <Grid item xs={2}>
                        <HPCounter initialValue={10}/>
                        <LeftList editProperty={this.editProperty} settlements={this.state.settlements} editCharacter={this.editCharacter} characters={this.state.characters} />
                    </Grid>
                    <Grid item xs={9}>
                        <Editor editable={this.state.editable} addCharacter={this.addCharacter} selected={this.state.selected} characters={this.state.characters} settlements={this.state.settlements} />
                        <button onClick={this.changeEditor}>Change editor</button>
                    </Grid>
                    <Grid item xs={12}>
                        <Logbook />
                        <Footer />
                    </Grid>
                </Grid>
            </div>

        );

    }
} export default EditorPage;
//vaihtaa editoria valinnan mukaan
const Editor = (props) => {
    if (props.selected === "character") {
        return (
            <Character defaultCharacter={props.editable} addCharacter={props.addCharacter} />
        )
    } else return <Settlement defaultValues={props.editable} addProperty={props.addProperty} characters={props.characters}/>
};
const LeftList = (props) => {
    const characterList = props.characters.map((char) =>
        <li><button onClick={(event => props.editCharacter(event.target.textContent))}>{char.name}</button></li>
    );
    const settlementList = props.settlements.map((settlement) =>
        <li><button onClick={(event => props.editProperty(event.target.textContent, "settlements"))}>{settlement.name}</button></li>
    );

    return (
        <div className="LeftNavigation" id="leftList">
            <h3>List of NPCs:</h3>
            <ul>{characterList}</ul>
            <h3>List of Settlements: </h3>
            <ul>{settlementList}</ul>
            <Button onClick={(event => props.editCharacter(""))} variant="contained" color="primary">Add new Character</Button>
        </div>
    )
};
