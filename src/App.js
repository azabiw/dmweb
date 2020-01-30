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
import Logbook from "./components/Logbook";
import 'semantic-ui-less/semantic.less'
import Header from "./components/Header";
import Settlement from "./components/Settlement";
import Character from "./components/Character";
//Pääohjelma
class App extends React.Component {

    render() {
        return (
            <Router >
                <Header />
                <Switch>
                    <Route path="/about">
                        <AboutPage />
                    </Route>
                    <Route path="/npceditor">
                        <EditorPage > <Character/> </EditorPage>
                    </Route>
                    <Route path="/settlementeditor">
                        <EditorPage><Settlement /></EditorPage>
                    </Route>
                    <Route path="/logbook">
                        <Logbook />
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
