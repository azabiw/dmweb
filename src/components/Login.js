import "firebase";
import React, { Suspense } from "react";
import store from "../redux/Store";
import * as firebase from "firebase";
import { Button} from "semantic-ui-react";
import {
    AuthCheck,
    useUser,
    useAuth,
    SuspenseWithPerf,
    useFirebaseApp
  } from 'reactfire';
class LoginComponent extends React.Component {
    unsubscribe;
    constructor(props) {
        super(props);
        this.googleLogin = this.googleLogin.bind(this);
        this.state = {
            loggedIn: false
        }
        //store.dispatch({type: "firebase/initialise"});
        this.unsubscribe = store.subscribe(this.handleChange);
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
            console.log(user);
             store.dispatch({
                 type: "user/set",
                 payload: user.uid
             });
             store.dispatch({
                type:"store/initialize"
             });
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