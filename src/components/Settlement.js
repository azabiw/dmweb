import React from "react";
import utilities from "./utilities";
import { Form, Field } from "react-final-form";
import SimpleField from "./SimpleField";
import {Container} from "semantic-ui-react";
import styles from "../styles/Settlement.module.css";
import  store from "../redux/Store";
import Segment from "semantic-ui-react/dist/commonjs/elements/Segment";
class Settlement extends React.Component {
    constructor(props) {
        let characters = store.getState().characters;
        super(props);
        this.state = {
            characters: characters,
            defaultValues: []
        }
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


    render() {
        const characterList = this.state.characters.map((character) =>
            <option value={character.id}> {character.name} </option>
        );
        return (
            <Container>
                <Segment>
                    <Form onSubmit={(formData) => {
                        console.log(formData);
                        if (formData.name === "" || formData.name === null) return;
                        let util = new utilities();
                        if (this.props.defaultValues === "") { //lisätään uusi kaupunki
                            util.sendToServer(formData,"post", "settlement");
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
                                <button type="submit">Save</button>
                            </form>
                        )}
                    </Form>
                </Segment>
            </Container>

        )
    }

}

export default Settlement;
