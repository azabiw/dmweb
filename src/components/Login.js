import "firebase";
import React from "react";
import store from "../redux/Store";
//import * as firebase from "firebase";
import { Button} from "semantic-ui-react";
import {
    AuthCheck,
    useUser,
    useAuth,
  } from 'reactfire';
class LoginContainer extends React.Component {
    unsubscribe;
    constructor(props) {
        super(props);
        this.googleLogin = this.googleLogin.bind(this);
        this.state = {
            loggedIn: false
        }
        store.dispatch({type: "firebase/initialise"});
        this.unsubscribe = store.subscribe(this.handleChange);
    }


    handleChange() {
        
    }


    googleLogin() {
        const auth = useAuth();
        const provider = auth.GoogleAuthProvider();

        auth.auth().signInWithPopup(provider).then(result => {
            const user = result.user;  
            const displayname = user.displayName;
            this.setState({
                loggedIn: true,
                username: displayname
             });
            console.log(user);

        });


    }

    render() {
        if (!this.state.loggedIn) {
            return (
                <div className={"loginContainer"}>
                    <Button onClick={e => this.googleLogin()}>Login with Google</Button>
                </div> 
             )
        }
        else {
            return (
                <div className={"loginContainer"}>
                    <h2>Logged in as: {this.state.username}</h2>
                </div> 
            )
        }
    }
} 

function LoginButton(props) {
    return <Button onClick={props.googleLogin}>Login with Google</Button>
}

export default LoginContainer;