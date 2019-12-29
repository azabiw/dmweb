import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Character from "./Character";
import Field from "./Field";
import "./utilities";
import Settlement from "./Settlement";
const Header = (props) => {
  return (
      <nav>
          Linkit halutuille sivuille.
      </nav>
  )
};




//Yksittäinen elementti vasemmassa navigaatiovalikossa. Tekstin voi vaihtaa props.label
const ListElement = (props) => {
    return (
        <div>
            <button>{props.label}</button>
        </div>
    )
};

//Tekee vasemman navigaatiolistan, josta voidaan valita yksittäisiä hahmoja.
const LeftList = (props) => {
    const listItems = props.characters.map((char) =>
        <li><button>{char.name}</button></li>
    );

    return (
        <div className="LeftNavigation" id="leftList">
            <ul>{listItems}</ul>
            <Button variant="contained" color="primary">Add new Character</Button>
        </div>
    )
}



const Footer = (props) => {
  return (
      <footer>
        Footer
      </footer>
  )
};

class Users extends React.Component {
    state = {users: []};


    render() {
        return (
            <div className="Users">
                <h1>Users</h1>
            </div>
        );
    }
}
//vaihtaa editoria valinnan mukaan
const Editor = (props) => {
    if (props.selected === "character") {
        return (
            <Character addCharacter={props.addCharacter} />
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
            settlements: []
        }; //Valittu editori
        this.changeEditor = this.changeEditor.bind(this); //vaaditaan, jotta this toimii ChangeEditorissa
        this.addCharacter = this.addCharacter.bind(this);
    }

    //käsittelee editorin vaihtamisen
    changeEditor() {
        if (this.state.selected === "character") {
            this.setState( {selected : "settlement"} );
        } else {
            this.setState( {selected : "character"} );
        }
    }

    //Lisää annetun hahmon tietorakenteeseen
    addCharacter(character) {
        let newCharacters = this.state.characters;
        newCharacters.push(character);
        this.setState({characters: newCharacters});
        console.log("hahmo lisätty");
    }

    async componentDidMount() {

        let response = await fetch('/users', {
            credentials: "omit",
            cache: "no-store",
            method: "get"
        });
        let data = await response.json();
        console.log(data);
        let chars = []; //TODO: korjaa kun datarakenne korjattu
        for (let i = 0; i < data.length; i++) {
            chars.push(data[i]["character"]);
        }
        this.setState({characters : chars});
    }

    render() {
        return (
            <div className="App">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Header/>
                    </Grid>
                    <Grid item xs={2}>
                        <LeftList characters={this.state.characters} />
                    </Grid>
                    <Grid item xs={9}>
                        <Editor addCharacter={this.addCharacter} selected={this.state.selected} characters={this.state.characters} />
                        <button  onClick={this.changeEditor}>Change editor</button>
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
