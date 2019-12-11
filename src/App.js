import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import {TextField} from "@material-ui/core";


const Header = (props) => {
  return (
      <nav>
          Linkit halutuille sivuille.
      </nav>
  )
}


function tallenna() {
    console.log("Tallenna");
}


const Field = (props) => {
    return (
        <div className="InputFieldContainer">
            <label className="FieldLabel">{props.label}</label>
            <TextField>{props.text}</TextField>
        </div>
    )
}


const Footer = (props) => {
  return (
      <footer>
        Footer
      </footer>
  )
}


function App() {
  return (
    <div className="App">
        <Header/>
        <form>
            <Field label={"Name"} text={""}/>
            <Field label={"Race"} text={""}/>
            <Field label={"Class"} text={""}/>
            <Field label={"Age"} text={""}/>
            <Button className="saveButton" variant="contained" color="primary" onClick={tallenna}>
                Save
            </Button>
        </form>
        <Footer/>
    </div>
  );
}

export default App;
