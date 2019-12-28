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
    return (
        <div className="LeftNavigation" id="leftList">
            <ListElement  label={"Character 1"}/>
            <ListElement  label={"Character 2"}/>
            <ListElement  label={"Character 3"}/>
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

    async componentDidMount() {

        let response = await fetch('/users', {
            credentials: "omit",
            cache: "no-store",
            method: "get"
        });
        let data = await response.json();
        console.log(data);
    }

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
            <Character  />
        )
    } else return <Settlement />
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
    }

    //käsittelee editorin vaihtamisen
    changeEditor() {
        if (this.state.selected === "character") {
            this.setState( {selected : "settlement"} );
        } else {
            this.setState( {selected : "character"} );
        }
    }


    render() {
        return (
            <div className="App">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Header/>
                    </Grid>
                    <Grid item xs={2}>
                        <LeftList/>
                    </Grid>
                    <Grid item xs={9}>
                        <Editor selected={this.state.selected} />
                        <button onClick={this.changeEditor}>Change editor</button>
                    </Grid>

                    <Grid item xs={9}>
                        <Settlement />
                        <Users />
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
