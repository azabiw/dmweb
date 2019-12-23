import React from "react";
import Button from "@material-ui/core/Button";
import Field from "./Field";
import "./utilities";
import utilities from "./utilities";

class Character extends React.Component{
    id = 0;
    constructor(props){
        super(props);

        this.state = {customFields: []};
    }
    fromJSON(properties) {
        this.charName = properties[0].value;
        this.race = properties[1].value;
        this.class = properties[2].value;
        this.age = properties[3].value;
    }
    render() {
        return (
            <fieldset>
                <legend>Edit NPC</legend>
                <form id="inputForm">
                    <Field label={"Name"} text={""}/>
                    <Field label={"Race"} text={""}/>
                    <Field label={"Class"} text={""}/>
                    <Field label={"Age"} text={""}/>
                    <Field label={"role"} text={""}/>
                    <Field label={"Short intro"} text={""}/>
                    <Field label={"Alignment"} text={""}/>
                    <Field label={"Size"} text={""}/>
                    <Field label={"Type"} text={""}/>
                    <Field label={"Sub Type"} text={""}/>
                    <Field label={"Organization"} text={""}/>



                    <Button className="saveButton" variant="contained" color="primary" onClick={utilities.save}>
                        Save
                    </Button>
                </form>
            </fieldset>
        )
    }
}

export default Character;