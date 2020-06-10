import "firebase";
import React from "react";
import store from "../redux/Store";
import * as firebase from "firebase";
import { Button} from "semantic-ui-react";
import {firebaseConfig} from "../other/firebaseConfig";

class LoginContainer extends React.Component {
    unsubscribe;
    constructor(props) {
        super(props);
        this.googleLogin = this.googleLogin.bind(this);
        this.state = {
            loggedIn: false
        }
        this.unsubscribe = store.subscribe(this.handleChange);
    }


    handleChange() {
        
    }


    googleLogin() {
        const app = firebase.initializeApp(firebaseConfig);
        const provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(result => {
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
        return (
           <div className={"loginContainer"}>
               <Button onClick={e => this.googleLogin()}>Login with Google</Button>
           </div> 
        )
    }
} 
export default LoginContainer;