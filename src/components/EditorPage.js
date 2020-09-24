import React from "react";
import {Container, Grid} from "semantic-ui-react";
import PropertyList from "./PropertyList";
import utilities from "./Utilities";
import store from "../redux/Store";
import {
    useUser,
  } from 'reactfire';

class EditorPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        };
    }

    //Napataan lapsikomponenttien virheet ja renderöidään tilalle viesti
    static getDerivedStateFromError(error) {  
          console.error(error);
          return {
               hasError: true 
            };  
        }
    /**
     * Fetches all user's data from server and saves them to corresponding states
     * @returns {Promise<void>}
     */
    componentDidMount() {
        utilities.initializeStore();
    }

    render() {
        if (this.state.hasError) {
            return <Container fluid>
                <h2>Something went wrong</h2>
            </Container>
        }
        return (
            <Container fluid>
                <Grid centered columns={2}>
                    <Grid.Column>
                        <SetUserID />
                        <PropertyList />
                        <Container>{
                           this.props.children
                        }</Container>
                    </Grid.Column>
                </Grid>
            </Container>

        );

    }
} export default EditorPage;

function SetUserID(props) {
    const user = useUser();
    try {
        let uid = user.uid;
        if (!uid) {
            store.dispatch({
            type:"user/set",
            payload: uid
        }) 
        }
    
    } catch (e) {
        console.error(e);
    }
    return <React.Fragment >
        
    </React.Fragment>
}