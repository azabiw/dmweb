import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Character from "./Character";
import "./utilities";
import Settlement from "./Settlement";
const Header = (props) => {
  return (
      <nav>
          Linkit halutuille sivuille.
      </nav>
  )
};


/**
 *
 * @param props List of characters and settlements as arrays
 * @returns {*} Navigation panel
 * @constructor
 */
const LeftList = (props) => {
    const characterList = props.characters.map((char) =>
        <li><button onClick={(event => props.editCharacter(event.target.textContent))}>{char.name}</button></li>
    );
    const settlementList = props.settlements.map((settlement) =>
        <li><button>{settlement.name}</button></li>
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

const Footer = (props) => {
  return (

      <footer>
        Footer
      </footer>
   )
};

//vaihtaa editoria valinnan mukaan
const Editor = (props) => {
    if (props.selected === "character") {
        return (
            <Character defaultCharacter={props.editable} addCharacter={props.addCharacter} />
        )
    } else return <Settlement characters={props.characters}/>
};

//Pääohjelma
class App extends React.Component {
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
    }

    /** TODO tee järkevämmäksi
     * Handles changing editor.
     */
    changeEditor() {
        if (this.state.selected === "character") {
            this.setState( {selected : "settlement"} );
        } else {
            this.setState( {selected : "character"} );
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

    editCharacter(characterName) {
        console.log("edit char clicked"+ characterName);
        if(characterName === "") {
            this.setState({editable: ""});
            return;
        }
        let characters = this.state.characters;
        let character;
        for (let char of characters) { //haetaan hahmoista lisättävä hahmo
            if (char.name === characterName) {
                character = char;
                break;
            }
        }
        if (character != null) this.setState({editable: character});

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
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Header/>
                    </Grid>
                    <Grid item xs={2}>
                        <LeftList settlements={this.state.settlements} editCharacter={this.editCharacter} characters={this.state.characters} />
                    </Grid>
                    <Grid item xs={9}>
                        <Editor editable={this.state.editable} addCharacter={this.addCharacter} selected={this.state.selected} characters={this.state.characters} />
                        <button onClick={this.changeEditor}>Change editor</button>
                    </Grid>
                    <Grid item xs={12}>
                        <Footer />
                    </Grid>
                </Grid>
            </div>
        );

    }
}

export default App;
