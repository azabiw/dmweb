import React from "react";
import Button from "@material-ui/core/Button";
import Field from "./Field";
import "./utilities";
import utilities from "./utilities";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

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
                    <Paper className={"inputFormPaper"}>
                        <Grid container spacing={4} direction="column">
                            <Grid item xs={6}>
                                <Grid container direction="row" spacing={2}>
                                    <Field label={"Name"} text={""}/>
                                    <Field label={"Race"} text={""}/>
                                    <Field label={"Class"} text={""}/>
                                    <Field label={"Age"} text={""}/>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container direction="row" spacing={2}>
                                    <Field label={"role"} text={""}/>
                                    <Field label={"Short intro"} text={""}/>
                                </Grid>
                            </Grid>
                            <Grid item xs={6}>
                                <Grid container direction="row"  spacing={2}>
                                    <Field label={"Alignment"} text={""}/>
                                    <Field label={"Size"} text={""}/>
                                    <Field label={"Type"} text={""}/>
                                    <Field label={"Sub Type"} text={""}/>
                                    <Field label={"Organization"} text={""}/>
                                </Grid>
                            </Grid>
                            <Button className="saveButton" variant="contained" color="primary" onClick={utilities.save}>
                                Save
                            </Button>
                        </Grid>
                    </Paper>
                </form>
            </fieldset>
        )
    }
}

export default Character;