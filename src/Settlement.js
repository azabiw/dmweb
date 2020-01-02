import React from "react";
//import Field from "./Field";
import Button from "@material-ui/core/Button";
import utilities from "./utilities";
import { Form, Field } from "react-final-form";
import SimpleField from "./SimpleField";
class Settlement extends React.Component {
    render() {
        const characterList = this.props.characters.map((character) =>
            <option value={character.name}> {character.name} </option>
        );
        return (
            <Form onSubmit={(formData) => {
                console.log(formData);
                if (formData.name === "" || formData.name === null) return;
                let util = new utilities();
                formData["formType"] = "settlement";
                utilities.sendToServer(formData);
            } }>
                {({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <SimpleField defaultValue={""} name={"name"} label={"Name"}/>
                        <div>
                            <label>Leader</label>
                            <Field name="leader" component="select">
                                {characterList}
                            </Field>
                        </div>
                        <SimpleField defaultValue={""} name={"location"} label={"Location"}/>
                        <SimpleField defaultValue={""} name={"feature"} label={"Notable features"}/>
                        <SimpleField defaultValue={""} name={"population"} label={"Population and structure"}/>
                        <SimpleField defaultValue={""} name={"security"} label={"Level of security"}/>
                        <SimpleField defaultValue={""} name={"organisations"} label={"Organisations"}/>
                        <SimpleField defaultValue={""} name={"interesting"} label={"Interesting locations"}/>
                        <button type="submit">Save</button>
                    </form>
                )}
            </Form>
        )
    }

}

export default Settlement;
