import React from "react";
import {Container} from "semantic-ui-react";
import {Form, Field} from "react-final-form";
import SimpleField from "./SimpleField";
import v4 from "uuid/v4";
import store from "../redux/Store";
import utilities from "./utilities";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";

class QuestEditor extends React.Component {

    render() {
        return (
            <Container >
                <Segment >
                    <h2>Edit Quest</h2>
                    <Form onSubmit={(formData) => {
                        formData["id"] = v4();
                        store.dispatch({type: "quest/add", payload: formData});
                    } }>
                        {({handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                                <SimpleField name={"guestName"} label={"Quest Name"}/>
                                <SimpleField name={"description"} label={"Description"}/>
                                <SimpleField name={"theme"} label={"theme"}/>
    
                            </form>
                        )}
                    </Form>
                </Segment>

            </Container>
        )
    }
} export default QuestEditor;