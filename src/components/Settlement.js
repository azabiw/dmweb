import React from "react";
import utilities from "./utilities";
import { Form, Field } from "react-final-form";
import SimpleField from "./SimpleField";
import {Button, Container} from "semantic-ui-react";
import styles from "../styles/Settlement.module.css";
import  store from "../redux/Store";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import v4 from "uuid/v4";
class Settlement extends React.Component {
    constructor(props) {
        let characters = store.getState().characters;
        let defaultValues = store.getState().editable;
        super(props);
        this.state = {
            characters: characters,
            defaultValues: defaultValues
        };
        this.handleChange = this.handleChange.bind(this);
        store.subscribe(this.handleChange);

    }
    //todo yleistä
        getDefault(defaults, attribute) {
        if (defaults[attribute] != null) {
            return defaults[attribute];
        }
        else {
            return "";
        }
    }

    handleChange() {
        let storeState = store.getState().editable;
        console.log("edit type in store" + storeState.editType);
        if (true || storeState.editType === "settlement") { //todo: korjaa tyyppi
            this.setState({defaultValues: storeState});
        }
    }


    render() {
        const characterList = this.state.characters.map((character) =>
            <option value={character.id}> {character.name} </option>
        );
        return (
            <Container>
                <Segment>
                    <h2>Edit Settlement/town</h2>
                    <Form onSubmit={(formData) => {
                        if (formData.name === "" || formData.name === null) return;
                        if (this.state.defaultValues.id != null ) formData["id"] = this.state.defaultValues.id;
                        if (formData["id"] == null) {
                            const id = v4();
                            console.log("asetettu id " + id);
                            formData["id"] = id;
                        }
                        console.log(formData);
                        store.dispatch({type:"settlement/add", payload: formData});
                        let util = new utilities();
                        if (store.getState().editable.length === 0 ) { //lisätään uusi kaupunki
                            util.sendToServer(formData,"post", "settlement");
                        }
                        else {
                            util.sendToServer(formData, "PATCH", "settlement"); //päivittää palvelimella olevaa hahmoa
                        }
                        //this.props.addProperty(formData, "settlements");
                    } }>
                        {({handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                                <SimpleField defaultText={this.getDefault(this.state.defaultValues, "name")} defaultValue={""} name={"name"} label={"Name"}/>
                                <div>
                                    <label>Leader</label>
                                    <Field selected={this.getDefault(this.state.defaultValues, "leader")} name="leader" component="select">
                                        <option value={"Not selected"}> {"Not selected"} </option>
                                        {characterList}
                                    </Field>
                                </div>
                                <SimpleField defaultText={this.getDefault(this.state.defaultValues, "location")} defaultValue={""} name={"location"} label={"Location"}/>
                                <SimpleField defaultText={this.getDefault(this.state.defaultValues, "feature")} defaultValue={""} name={"feature"} label={"Notable features"}/>
                                <SimpleField defaultText={this.getDefault(this.state.defaultValues, "population")} defaultValue={""} name={"population"} label={"Population and structure"}/>
                                <SimpleField defaultText={this.getDefault(this.state.defaultValues, "security")} name={"security"} label={"Level of security"}/>
                                <SimpleField defaultText={this.getDefault(this.state.defaultValues, "organisations")} name={"organisations"} label={"Organisations"}/>
                                <SimpleField defaultText={this.getDefault(this.state.defaultValues, "interesting")} name={"interesting"} label={"Interesting locations"}/>
                                <Button primary type="submit">Save</Button>
                                <Button color={"red"} onClick={(event) => {
                                    return 1
                                }}>Remove</Button>
                            </form>
                        )}
                    </Form>
                </Segment>
            </Container>

        )
    }

}

export default Settlement;
