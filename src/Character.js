import React from "react";
import Button from "@material-ui/core/Button";
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

    //palauttaa vakioarvon NPC:n ominaisuudelle.
    getDefault(defaults, attribute) {
        if (defaults[attribute] != null) {
            return defaults[attribute];
        }
        else {
            return "";
        }
    }
    render() {
        console.log(this.props.defaultCharacter);
        return (
            <fieldset>
                <legend>Edit NPC</legend>
                <Form onSubmit={(formData) => {
                    console.log(formData);
                    let util = new utilities();
                    if (formData.name === "") return;  //ei lisätä tyhjää hahmoa //todo muuta tilaa, jos hahmon nimi on tyhjä ja poista käytöstä tallennuspainike
                    util.sendToServer(formData);
                    this.props.addCharacter(formData); //lisää hahmon pääohjelman tilaksi
                } }>
                    {({handleSubmit}) => (
                        <form onSubmit={handleSubmit} id="inputForm">
                            <Paper className={"inputFormPaper"}>
                                <Grid container spacing={4} direction="column">
                                    <Grid item xs={6}>
                                        <Grid container direction="row" spacing={2}>
                                            <SimpleField defaultText={this.getDefault(this.props.defaultCharacter, "name")} name={"name"} label={"Name"}/>
                                            <SimpleField defaultText={this.getDefault(this.props.defaultCharacter, "race")} name={"race"} label={"Race"} />
                                            <SimpleField defaultText={this.getDefault(this.props.defaultCharacter, "characterClass")} name={"characterClass"} label={"Class"} />
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Grid container direction="row" spacing={2}>
                                            <SimpleField defaultText={this.getDefault(this.props.defaultCharacter, "role")} name={"role"} label={"Role"} />
                                            <SimpleField defaultText={this.getDefault(this.props.defaultCharacter, "intro")} name={"intro"} label={"Short intro"} />
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
                                                    <SimpleField defaultText={this.getDefault(this.props.defaultCharacter, "alignment")} name={"alignment"} label={"Alignment"} />
                                                    <SimpleField defaultText={this.getDefault(this.props.defaultCharacter, "size")} name={"size"} label={"Size"} />
                                                    <SimpleField defaultText={this.getDefault(this.props.defaultCharacter, "type")} name={"type"} label={"Type"} />
                                                    <SimpleField defaultText={this.getDefault(this.props.defaultCharacter, "subtype")} name={"subtype"} label={"Subtype"} />
                                                    <SimpleField defaultText={this.getDefault(this.props.defaultCharacter, "organisation")} name={"organisation"} label={"Organisation"} />
                                                    <SimpleField defaultText={this.getDefault(this.props.defaultCharacter, "age")} name={"age"} label={"Age"} />
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
                                                    <SimpleField defaultText={this.getDefault(this.props.defaultCharacter, "ac")} label={"AC"} name={"ac"}/>
                                                    <SimpleField defaultText={this.getDefault(this.props.defaultCharacter, "hp")} name={"hp"} label={"HP"}/>
                                                    <SimpleField defaultText={this.getDefault(this.props.defaultCharacter, "fort")} name={"fort"}  label={"Fort"} />
                                                    <SimpleField defaultText={this.getDefault(this.props.defaultCharacter, "ref")} name={"ref"} label={"Ref"} />
                                                    <SimpleField defaultText={this.getDefault(this.props.defaultCharacter, "will")} name={"will"} label={"Will"} />
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
                                                    <SimpleField defaultText={this.getDefault(this.props.defaultCharacter, "speed")} name={"speed"} label={"Speed"}/>
                                                    <SimpleField defaultText={this.getDefault(this.props.defaultCharacter, "melee")} name={"melee"} label={"Melee"}/>
                                                    <SimpleField defaultText={this.getDefault(this.props.defaultCharacter, "specialattacks")} name={"specialattacks"} label={"Special attacks"}/>
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
                                                    <SimpleField defaultText={this.getDefault(this.props.defaultCharacter, "beforeCombat")} name={"beforeCombat"} label={"Before Combat"}/>
                                                    <SimpleField defaultText={this.getDefault(this.props.defaultCharacter, "duringCombat")} name={"duringCombat"} label={"During Combat"} />
                                                    <SimpleField defaultText={this.getDefault(this.props.defaultCharacter, "combatGear")} name={"combatGear"} label={"Combat Gear"} />
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
            <Field defaultValue={props.defaultText} name={props.name} component="input" type="text" placeholder={props.label} />
        </div>
    )
};

export default Character;