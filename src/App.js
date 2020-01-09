import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Character from "./components/Character";
import "./components/utilities";
import Settlement from "./components/Settlement";
import HPCounter from "./components/HPCounter";
import Logbook from "./components/Logbook";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import FrontPage from "./components/FrontPage";
import Header from "./components/Header";
import AboutPage from "./components/AboutPage";
import styles from "./styles/Editor.module.css";
import EditorPage from "./components/EditorPage";
/**
 *
 * @param props List of characters and settlements as arrays
 * @returns {*} Navigation panel
 * @constructor
 */



//Pääohjelma
class App extends React.Component {

    render() {
        return (
            <Router >

                <Switch>
                    <Route path="/about">
                        <AboutPage />
                    </Route>
                    <Route path="/editor">
                        <Header/>

                        <div className="App">
                            <EditorPage />
                        </div>
                    </Route>
                    <Route path="/">
                        <FrontPage />
                    </Route>
                </Switch>

            </Router>

        );

    }
}

export default App;
