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
         this.handleNameChange = this.handleNameChange.bind(this);
         this.handleClassChange = this.handleClassChange.bind(this);
         this.handleRaceChange = this.handleRaceChange.bind(this);
         this.handleAgeChange = this.handleAgeChange.bind(this);

         this.state = {customFields: []};
     }
     fromJSON(properties) {
         this.name = properties[0].value;
         this.race = properties[1].value;
         this.class = properties[2].value;
         this.age = properties[3].value;
         console.log(this);
     }
     //pohjana käytetty https://reactjs.org/docs/lifting-state-up.html
     //TODO: tee järkevämpi ratkaisu
     handleNameChange(input) {
         this.setState({name : input});
         console.log(this);
     }
     handleClassChange(input) {
         this.setState({class : input});
         console.log(this);
     }
     handleRaceChange(input) {
        this.setState({race : input});
        console.log(this);
    }
     handleAgeChange(input) {
        this.setState({age : input});
        console.log(this);
    }
     render() {
         return (
             <fieldset>
                 <legend>Edit NPC</legend>
                <form id="inputForm">
                    <Field label={"Name"} text={""} onInputChange={this.handleNameChange}/>
                    <Field label={"Race"} text={""} onInputChange={this.handleRaceChange}/>
                    <Field label={"Class"} text={""} onInputChange={this.handleClassChange}/>
                    <Field label={"Age"} text={""} onInputChange={this.handleAgeChange}/>
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

function save() {
    let fields = document.getElementsByClassName("InputFieldContainer");
    let data = [];
    for (let field of fields) {
        let name = field.childNodes[0].textContent;
        let text = field.childNodes[0].firstChild.value;
        let row = {propertyName : name, value:text};
        data.push(row);
    }
    console.log(data);
    console.log();
    const character = new Character();
    character.fromJSON(data);
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
        this.handleChange = this.handleChange.bind(this);
        this.state = {value: ""};
    }
    handleChange(e) {
        this.props.onInputChange(e.target.value);
    }
    render() {
        let id = this.props.label + "TextField";
        return (
            <div className="InputFieldContainer">
                <label id={id} className="FieldLabel">{this.props.label}
                    <textarea defaultValue={this.props.text}  onChange={this.handleChange}
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
            </Grid>
            <Grid item xs={12}>
                <Footer />
            </Grid>
        </Grid>
    </div>
  );
}

export default App;
