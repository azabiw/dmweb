import React from "react";
//import Field from "./Field";
import Button from "@material-ui/core/Button";
import "./utilities";
import utilities from "./utilities";
import { Form, Field } from "react-final-form";
import SimpleField from "./SimpleField";
class Settlement extends React.Component {
    #id = 0;
    name = "New Settlement";
    leader;
    characters = [];
    constructor(props) {
        super(props);

    }
    render() {
        const characterList = this.props.characters.map((character) =>
            <option value={character.name}> {character.name} </option>
        );
        return (
            <Form onSubmit={(formData) => {
                console.log(formData);
            } }>
                {({handleSubmit}) => (
                    <form onSubmit={handleSubmit}>
                        <SimpleField name={"name"} label={"Name"}/>
                        <label>Leader</label>
                        <Field name="leader" component="select">
                            {characterList}
                        </Field>
                        <SimpleField name={"location"} label={"Location"}/>

                        <SimpleField name={"feature"} label={"Notable features"}/>

                        <SimpleField name={"population"} label={"Population and structure"}/>

                        <SimpleField name={"security"} label={"Level of security"}/>
                        <SimpleField name={"organisations"} label={"Organisations"}/>
                        <SimpleField name={"interesting"} label={"Interesting locations"}/>

                        <button type="submit">Save</button>
                    </form>
                )}
            </Form>
        )
    }

}

export default Settlement;
