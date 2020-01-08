import React from "react";
//import Field from "./Field";
import Button from "@material-ui/core/Button";

import utilities from "./utilities";
import { Form, Field } from "react-final-form";
import SimpleField from "./SimpleField";
class Settlement extends React.Component {

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
        const characterList = this.props.characters.map((character) =>
            <option value={character.name}> {character.name} </option>
        );
        return (
            <Form onSubmit={(formData) => {
                console.log(formData);
                if (formData.name === "" || formData.name === null) return;
                let util = new utilities();
                if (this.props.defaultValues === "") { //lisätään uusi kaupunki
                    util.sendToServer(formData,"post", "settlement");
                }
                this.props.addProperty(formData, "settlements");
            } }>
                {({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <SimpleField defaultText={this.getDefault(this.props.defaultValues, "name")} defaultValue={""} name={"name"} label={"Name"}/>
                        <div>
                            <label>Leader</label>
                            <Field selected={this.getDefault(this.props.defaultValues, "leader")} name="leader" component="select">
                                <option value={"Not selected"}> {"Not selected"} </option>
                                {characterList}
                            </Field>
                        </div>
                        <SimpleField defaultText={this.getDefault(this.props.defaultValues, "location")} defaultValue={""} name={"location"} label={"Location"}/>
                        <SimpleField defaultText={this.getDefault(this.props.defaultValues, "feature")} defaultValue={""} name={"feature"} label={"Notable features"}/>
                        <SimpleField defaultText={this.getDefault(this.props.defaultValues, "population")} defaultValue={""} name={"population"} label={"Population and structure"}/>
                        <SimpleField defaultText={this.getDefault(this.props.defaultValues, "security")} name={"security"} label={"Level of security"}/>
                        <SimpleField defaultText={this.getDefault(this.props.defaultValues, "organisations")} name={"organisations"} label={"Organisations"}/>
                        <SimpleField defaultText={this.getDefault(this.props.defaultValues, "interesting")} name={"interesting"} label={"Interesting locations"}/>
                        <button type="submit">Save</button>
                    </form>
                )}
            </Form>
        )
    }

}

export default Settlement;
