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


function save() {
    let fields = document.getElementsByClassName("InputFieldContainer");
    for (let field of fields) {
        let label = field.childNodes[0].textContent;
        let text = field.childNodes[1].value;
        console.log(label + " : " + text);
    }
}


const Field = (props) => {
    let id = props.label + "TextField";
    return (
        <div className="InputFieldContainer">
            <label id={id} className="FieldLabel">{props.label}</label>
            <textarea defaultValue={props.text}></textarea>
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
