import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';


const Header = (props) => {
  return (
      <nav>
          Linkit halutuille sivuille.
      </nav>
  )
};
class Character {
     id = 0;
     name = "";
     race = "";
     class = "";
     age = "";
     customFields = [];
     fromJSON(properties) {
         this.name = properties[0].value;
         this.race = properties[1].value;
         this.class = properties[2].value;
         this.age = properties[3].value;
         console.log(this);
     }
}

class Settlement  {
    leader;

}

function save() {
    let fields = document.getElementsByClassName("InputFieldContainer");
    let data = [];
    for (let field of fields) {
        let name = field.childNodes[0].textContent;
        let text = field.childNodes[1].value;
        let row = {property : name, value:text};
        data.push(row);
    }
    console.log(data);
    console.log();
    const character = new Character();
    character.fromJSON(data);
}



const Field = (props) => {
    let id = props.label + "TextField";
    return (
        <div className="InputFieldContainer">
            <label id={id} className="FieldLabel">{props.label}</label>
            <textarea defaultValue={props.text}/>
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


function App() {
  return (
    <div className="App">
        <Header/>
        <form id="inputForm">
            <Field label={"Name"} text={""}/>
            <Field label={"Race"} text={""}/>
            <Field label={"Class"} text={""}/>
            <Field label={"Age"} text={""}/>
            <Button className="saveButton" variant="contained" color="primary" onClick={save}>
                Save
            </Button>
        </form>
        <Footer/>
    </div>
  );
}

export default App;
