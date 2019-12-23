import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";


const Header = (props) => {
  return (
      <nav>
          Linkit halutuille sivuille.
      </nav>
  )
};
class Character extends React.Component{
     id = 0;
     constructor(props){
         super(props);

         this.state = {customFields: []};
     }
     fromJSON(properties) {
         this.name = properties[0].value;
         this.race = properties[1].value;
         this.class = properties[2].value;
         this.age = properties[3].value;
     }
     render() {
         return (
             <fieldset>
                 <legend>Edit NPC</legend>
                <form id="inputForm">
                    <Field label={"Name"} text={""}/>
                    <Field label={"Race"} text={""}/>
                    <Field label={"Class"} text={""}/>
                    <Field label={"Age"} text={""}/>
                    <Button className="saveButton" variant="contained" color="primary" onClick={save}>
                     Save
                    </Button>
                </form>
             </fieldset>
         )
     }
}
class Settlement extends React.Component {
    #id = 0;
    name = "New Settlement";
    leader;
    characters = [];
    render() {
         return (
            <form id="inputForm">
                <Field label={"Name"} text={""}/>
                <select className="SettlementLeaderSelector">
                    <option value="testi">Character 1</option>
                    <option value="testi2">Character 2</option>
                    <option value="testi">Character 3</option>
                </select>
                <Button className="saveButton" variant="contained" color="primary" onClick={save}>
                    Save
                </Button>
            </form>
         )
     }

}

//todo: virheenkäsittely
//lähettää lomakkeen sisällön palvelimelle
function save() {
    let fields = document.getElementsByClassName("InputFieldContainer");
    let data = [];
    data.push({username: "testUser1"});
    for (let field of fields) {
        console.log(field);
        let name = field.childNodes[0].textContent;
        let text = field.childNodes[0].childNodes[1].value;
        let row = {propertyName : name, value:text};
        data.push(row);
    }
    console.log();
    const character = new Character();
    character.fromJSON(data);
    console.log(character);
    sendToServer(data);
}

async function sendToServer(data) {
    const url = "/users";
    console.log(data);
    try {
        const response = await fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(data), // data can be `string` or {object}!
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

//tekstikenttä, joka siirtää arvonsa ylemmälle elementille.
class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ""};
    }
    render() {
        let id = this.props.label + "TextField";
        return (
            <div className="InputFieldContainer">
                <label id={id} className="FieldLabel">{this.props.label}
                    <textarea defaultValue={this.props.text}
                    />
                </label>
            </div>
        )

    }

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



//Pääohjelma
function App() {
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
                <Character />
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

export default App;
