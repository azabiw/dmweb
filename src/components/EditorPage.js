import React from "react";
import Footer from "./Footer";
import {Container, Grid} from "semantic-ui-react";
import PropertyList from "./PropertyList";
import utilities from "./Utilities";

class EditorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "character",
            characters: [],
            settlements: [],
            editable: ""
        }; //Valittu editori
    }

    /**
     * Fetches all user's data from server and saves them to corresponding states
     * @returns {Promise<void>}
     */
    componentDidMount() {
        utilities.initializeStore();
    }

    render() {
        return (
            <Container fluid>
                <Grid centered columns={2}>
                    <Grid.Column>
                        <PropertyList />
                        <Container>{
                           this.props.children
                        }</Container>
                    </Grid.Column>
                    <div>
                        <Footer />
                    </div>
                </Grid>
            </Container>

        );

    }
} export default EditorPage;
