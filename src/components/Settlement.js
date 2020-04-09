import React from "react";
import utilities from "./Utilities";
import { Form, Field } from "react-final-form";
import SimpleField from "./SimpleField";
import {Button, Container} from "semantic-ui-react";
import styles from "../styles/Settlement.module.css";
import  store from "../redux/Store";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
import v4 from "uuid/v4";
import SelectorField from "./SelectorField";
class Settlement extends React.Component {
    #isNew = true;
    constructor(props) {
        let characters = store.getState().characters;
        let defaultValues = store.getState().editable;
        super(props);
        if (defaultValues !== []) this.isNew = false;
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
        console.log(this.state.characters);
        return (
            <Container>
                <Segment>
                    <h2>Edit Settlement/town</h2>
                    <Form onSubmit={(formData) => {
                        utilities.handleFormData(formData,this.state.defaultValues, "settlement", "editable/set", this.#isNew);
                    } }>
                        {({handleSubmit}) => (
                            <form onSubmit={handleSubmit}>
                                <SimpleField  id={"name"} defaultText={this.getDefault(this.state.defaultValues, "name")} defaultValue={""} name={"name"} label={"Name"}/>
                                <SelectorField idOfDefault={this.state.defaultValues["leader"]} properties={this.state.characters} name={"leader"} label={"Leader"} />
                                <SimpleField defaultText={this.getDefault(this.state.defaultValues, "location")} defaultValue={""} name={"location"} label={"Location"}/>
                                <SimpleField defaultText={this.getDefault(this.state.defaultValues, "feature")} defaultValue={""} name={"feature"} label={"Notable features"}/>
                                <SimpleField defaultText={this.getDefault(this.state.defaultValues, "population")} defaultValue={""} name={"population"} label={"Population and structure"}/>
                                <SimpleField defaultText={this.getDefault(this.state.defaultValues, "security")} name={"security"} label={"Level of security"}/>
                                <SimpleField defaultText={this.getDefault(this.state.defaultValues, "organisations")} name={"organisations"} label={"Organisations"}/>
                                <SimpleField defaultText={this.getDefault(this.state.defaultValues, "interesting")} name={"interesting"} label={"Interesting locations"}/>
                                <Button primary type="submit">Save</Button>
                                <Button color={"red"} onClick={(event) => {
                                    let util = new utilities();
                                    let name = document.getElementById("name").value;
                                    console.log(name);
                                    let charToDelete = {
                                        name: name
                                    };
                                    util.sendToServer(charToDelete,"DELETE");
                                    utilities.initializeStore();
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
