import React from "react";
import Button from "@material-ui/core/Button";
import "./utilities";
import utilities from "./utilities";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import {ExpansionPanel, ExpansionPanelDetails} from "@material-ui/core";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreRounded';
import Typography from "@material-ui/core/Typography";
import {Form, Field} from "react-final-form";
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
                <Form onSubmit={(formData) => {
                    console.log(formData);
                } }>
                    {({handleSubmit}) => (
                        <form onSubmit={handleSubmit} id="inputForm">
                            <Paper className={"inputFormPaper"}>
                                <Grid container spacing={4} direction="column">
                                    <Grid item xs={6}>
                                        <Grid container direction="row" spacing={2}>
                                            <SimpleField name={"name"} label={"Name"}/>
                                            <SimpleField name={"race"} label={"Race"} />
                                            <SimpleField name={"characterClass"} label={"Class"} />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid container direction="row" spacing={2}>
                                            <SimpleField name={"role"} label={"Role"} />
                                            <SimpleField name={"intro"} label={"Short intro"} />
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
                                                    <SimpleField name={"alignment"} label={"Alignment"} />
                                                    <SimpleField name={"size"} label={"Size"} />
                                                    <SimpleField name={"type"} label={"Type"} />
                                                    <SimpleField name={"subtype"} label={"Subtype"} />
                                                    <SimpleField name={"organisation"} label={"Organisation"} />
                                                    <SimpleField name={"age"} label={"Age"} />
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
                                                    <SimpleField label={"AC"} name={"ac"}/>
                                                    <SimpleField name={"hp"} label={"HP"}/>
                                                    <SimpleField name={"fort"}  label={"Fort"} />
                                                    <SimpleField name={"ref"} label={"Ref"} />
                                                    <SimpleField name={"will"} label={"Will"} />
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
                                                    <SimpleField name={"speed"} label={"Speed"}/>
                                                    <SimpleField name={"melee"} label={"Melee"}/>
                                                    <SimpleField name={"specialattacks"} label={"Special attacks"}/>
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
                                                    <SimpleField name={"beforeCombat"} label={"Before Combat"}/>
                                                    <SimpleField name={"duringCombat"} label={"During Combat"} />
                                                    <SimpleField name={"combatGear"} label={"Combat Gear"} />
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>
                                        </Grid>
                                    </Grid>

                                    <Button type="submit" className="saveButton" variant="contained" color="primary">
                                        Save
                                    </Button>
                                </Grid>
                            </Paper>
                        </form>
                    )}
                </Form>

            </fieldset>
        )
    }
}

const SimpleField = (props ) => {
    return (
        <div >
            <label>{props.label}</label>
            <Field name={props.name} component="input" type="text" placeholder={props.label} />
        </div>
    )
}

export default Character;