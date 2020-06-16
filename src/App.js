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
import store from "./redux/Store";
import { AuthCheck, SuspenseWithPerf } from 'reactfire';
import * as firebase from "firebase";

//Pääohjelma
class App extends React.Component {
    constructor(props) {
        super(props);
        const perf = firebase.performance();
        const analytics = firebase.analytics();
    }
    render() {
        return (
            <SuspenseWithPerf fallback={"loading"} traceId={"mainApp"}>
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
                    <Route path={"/editor/new"}>
                        <AuthCheck fallback={<LoginPromt />}>
                        <EditorPage > 
                            <JSONForm id={v4()}  isNew={true}/>    
                        </EditorPage>
                        </AuthCheck>
                    </Route>
                    <Route path="/editor/:id" > 
                        <AuthCheck fallback={<LoginPromt />}>
                            <EditorPage><IDResolverForJsonForm /></EditorPage>
                        </AuthCheck>
                    </Route>
                    <Route path={"/editor"}>
                        <AuthCheck fallback={<LoginPromt />}>
                            <EditorPage />
                        </AuthCheck>
                    </Route>


                    <Route path="/">
                        <FrontPage />
                    </Route>

                </Switch>

            </Router>
            </SuspenseWithPerf>
        );

    }
}

function LoginPromt(props) {
    return <React.Fragment>
        Please login
    </React.Fragment>
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
