import React from "react";
import {Button, Container} from "semantic-ui-react";
import {Form, Field} from "react-final-form";
import SimpleField from "./SimpleField";
import v4 from "uuid/v4";
import store from "../redux/Store";
import utilities from "./utilities";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";

class QuestEditor extends React.Component {
    constructor(props) {
        super(props);
        let characters = store.getState().characters;
        let settlements = store.getState().settlements;
        let defaultValues = store.getState().editable;
        this.state = {
            characters: characters,
            settlements: settlements,
            defaultValues: defaultValues
        };
        this.handleChange = this.handleChange.bind(this);
        store.subscribe(this.handleChange);
    }
    handleChange() {
        let storeState = store.getState().editable;
        console.log("edit type in store" + storeState.editType);
        if (true || storeState.editType === "quest") { //todo: korjaa tyyppi
            this.setState({defaultValues: storeState});
        }
    }

    render() {
        return (
            <Container >
                <Segment >
                    <h2>Edit Quest</h2>
                    <Form onSubmit={(formData) => {
                        formData["id"] = v4();
                        store.dispatch({type: "quest/add", payload: formData});
                        if (formData.name === "" || formData.name === null) return;
                        if (this.state.defaultValues.id != null ) formData["id"] = this.state.defaultValues.id;
                        if (formData["id"] == null) {
                            const id = v4();
                            console.log("asetettu id " + id);
                            formData["id"] = id;
                        }
                        console.log(formData);
                        store.dispatch({type:"quest/add", payload: formData});
                        let util = new utilities();
                        if (store.getState().editable.length === 0 ) { //lisätään uusi kaupunki
                            util.sendToServer(formData,"post", "quest");
                        }
                        else {
                            util.sendToServer(formData, "PATCH", "quest"); //päivittää palvelimella olevaa hahmoa
                        }
                    } }>
                        {({handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                                <SimpleField name={"guestName"} label={"Quest Name"}/>
                                <SimpleField name={"description"} label={"Description"}/>
                                <SimpleField name={"theme"} label={"theme"}/>
                                <Button primary type="submit">Add quest</Button>
                            </form>
                        )}
                    </Form>
                </Segment>

            </Container>
        )
    }
} export default QuestEditor;