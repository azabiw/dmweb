import React from 'react';
import './App.css';
import "./components/Utilities";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams
} from "react-router-dom";
import FrontPage from "./components/FrontPage";
import AboutPage from "./components/AboutPage";
import EditorPage from "./components/EditorPage";
import HPCounterContainer from "./components/HPCounterContainer";
import Logbook from "./components/Logbook";
import 'semantic-ui-less/semantic.less'
import Header from "./components/Header";
import JSONForm from './components/JSONForm';
import {v4} from "uuid";
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
                    <Route path="/logbook">
                        <Logbook />
                    </Route>
                    <Route path="/hpc">
                        <HPCounterContainer />
                    </Route>
                    <Route path="/editor/:id" > 
                        <EditorPage><IDResolverForJsonForm /></EditorPage>
                    </Route>
                    <Route path={"/editor"}>
                        <EditorPage />
                    </Route>

                    <Route path="/">
                        <FrontPage />
                    </Route>

                </Switch>

            </Router>

        );

    }
}

function IDResolverForJsonForm(props) {
    let { id } = useParams();
    return (
        <React.Fragment>
            <JSONForm id={id} />
        </React.Fragment>
    )
}

export default App;
