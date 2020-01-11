import React from 'react';
import './App.css';
import "./components/utilities";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import FrontPage from "./components/FrontPage";
import AboutPage from "./components/AboutPage";
import EditorPage from "./components/EditorPage";
import HPCounterContainer from "./components/HPCounterContainer";


//Pääohjelma
class App extends React.Component {

    render() {
        return (
            <Router >
                <Switch>
                    <Route path="/about">
                        <AboutPage />
                    </Route>
                    <Route path="/npceditor">
                        <div className="App">
                            <EditorPage />
                        </div>
                    </Route>
                    <Route path="/hpc">
                        <HPCounterContainer />
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
