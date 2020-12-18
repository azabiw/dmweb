import "firebase";
import React from "react";
import store from "../redux/Store";
import * as firebase from "firebase";
import { Button} from "semantic-ui-react";
import {
    useUser,
    useAuth,
    SuspenseWithPerf,
  } from 'reactfire';
import Helper from "./Helper";
class LoginComponent extends React.Component {
    unsubscribe;
    constructor(props) {
        super(props);
        this.googleLogin = this.googleLogin.bind(this);
        let loggedIn = this.props.loggedIn || false;
        let displayName = this.props.displayName || "";
        this.state = {
            loggedIn: loggedIn,
            username: displayName
        }
        //store.dispatch({type: "firebase/initialise"});
        this.unsubscribe = store.subscribe(this.handleChange);
        this.logout = this.logout.bind(this);
    }


    handleChange() {
        
    }


    googleLogin() {
        const auth = this.props.auth;
        const provider = new firebase.auth.GoogleAuthProvider();

        auth.signInWithPopup(provider).then(result => {
            const user = result.user;  
            const displayname = user.displayName;
            this.setState({
                loggedIn: true,
                username: displayname
             });
           // console.log(user);
             store.dispatch({
                 type: "user/set",
                 payload: user.uid
             });
             store.dispatch({
                type:"store/initialize"
             });
        });


    }

    logout() {
        const auth = this.props.auth;
        this.setState({
            loggedIn: false
        });
        auth.signOut().then(function() {
            store.dispatch({
                type: "user/set",
                payload: ""
            });
            console.log("logged out");
          }).catch(function(error) {
            // An error happened.
            console.error("Error while logging out", error);
          });
          

    }

    render() {
        if (!this.state.loggedIn) {
            return (
                <div className={"loginContainer"}>
                    <Button onClick={e => this.googleLogin()}>Login with Google</Button>
                    <Helper hint="Registers a new account if you don't already have one." />
                </div> 
             )
        }
        else {
            return (
                <div className={"loginContainer"}>
                    <h2>Logged in as: {this.state.username}</h2>
                    <Button onClick={e => this.logout()}>Log out</Button>
                </div> 
            )
        }
    }
} 

function AuthResolver() {
    const auth = useAuth();
    const user = useUser();
    console.log("user", user);
    if (auth.currentUser !== null) {
        let uid = auth.currentUser.uid;
        store.dispatch({
            type:"user/set",
            payload: uid
        });
        return (
            <LoginComponent auth={auth} loggedIn={true} displayName={user.displayName} />
        )
    
    }

    return(
        <LoginComponent auth={auth}  />
    ) 
  }

 function LoginContainer() {
   return <SuspenseWithPerf fallback={"loading"} traceId={"loginFlow"}>
        <AuthResolver />
    </SuspenseWithPerf>
 }

export default LoginContainer;