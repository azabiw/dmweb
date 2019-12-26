import React from "react";
import Button from "@material-ui/core/Button";
import Field from "./Field";
import "./utilities";
import utilities from "./utilities";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {ExpansionPanel, ExpansionPanelDetails} from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreRounded';
import Typography from "@material-ui/core/Typography";
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
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography >General</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Field label={"Alignment"} text={""}/>
                                            <Field label={"Size"} text={""}/>
                                            <Field label={"Type"} text={""}/>
                                            <Field label={"Sub Type"} text={""}/>
                                            <Field label={"Organization"} text={""}/>
                                            <Field label={"Age"} text={""}/>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                </Grid>
                            </Grid>

                            <Grid item xs={6}>
                                <Grid container direction="row"  spacing={2}>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography >Defense</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Field label={"AC"} text={""}/>
                                            <Field label={"HP"} text={""}/>
                                            <Field label={"Fort"} text={""}/>
                                            <Field label={"Ref"} text={""}/>
                                            <Field label={"Will"} text={""}/>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                </Grid>
                            </Grid>

                            <Grid item xs={6}>
                                <Grid container direction="row"  spacing={2}>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography >Offense</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Field label={"Speed"} text={""}/>
                                            <Field label={"Melee"} text={""}/>
                                            <Field label={"Special attacks"} text={""}/>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                </Grid>
                            </Grid>

                            <Grid item xs={6}>
                                <Grid container direction="row"  spacing={2}>
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography >Tactics</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Field label={"Before Combat"} text={""}/>
                                            <Field label={"During Combat"} text={""}/>
                                            <Field label={"Combat Gear"} text={""}/>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
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