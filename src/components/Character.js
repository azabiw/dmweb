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
import SimpleField from "./SimpleField";
import styles from "../styles/characterform.module.css";
import {Card, Segment} from "semantic-ui-react";
import store from "../redux/Store";
import v4 from 'uuid/v4';

class Character extends React.Component{
    constructor(props){
        let defaultCharacter = store.getState().editable;
        super(props);
        this.state = {
            customFields: [],
            defaultCharacter: defaultCharacter
        };
        this.handleChange = this.handleChange.bind(this);
        store.subscribe(this.handleChange);
    }
    

    handleChange() {
        let storeState = store.getState().editable;
        console.log("edit type in store" + storeState.editType);
        if (true || storeState.editType === "characters") { //todo: korjaa tyyppi
            this.setState({defaultCharacter: storeState});
        }
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
        return (
            <Segment className={styles.editor}>
                <h3>Edit NPC</h3>
                <Form onSubmit={(formData) => {
                    if (this.state.defaultCharacter["id"] != null) formData["id"] = this.state.defaultCharacter.id;
                    if (formData["id"] == null) {
                        const id = v4();
                        console.log("asettettu id " + id);
                        formData["id"] = id;
                    }
                    console.log("lomakkeen id" + formData.id);
                    store.dispatch({type: "characters/add",payload:formData});
                    console.log(formData);
                    let util = new utilities();
                    if (formData.name === "") return;  //ei lisätä tyhjää hahmoa //todo muuta tilaa, jos hahmon nimi on tyhjä ja poista käytöstä tallennuspainike
                    if(store.getState().editable.length === 0) util.sendToServer(formData, "post", "character"); //tehdään uusi hahmo
                    else {
                        util.sendToServer(formData, "PATCH", "character"); //päivittää palvelimella olevaa hahmoa
                    }
                   // this.props.addCharacter(formData); //lisää hahmon pääohjelman tilaksi. addCharacter osaa käsitellä hahmon muokkauksen
                } }>
                    {({handleSubmit}) => (
                        <form onSubmit={handleSubmit} id="inputForm">
                            <Grid container spacing={4} direction="column">
                                <Grid item xs={6}>
                                    <Paper className={styles.Paper}>
                                        <Grid container direction="row" spacing={2}>

                                            <SimpleField id={"name"} defaultText={this.getDefault(this.state.defaultCharacter, "name")} name={"name"} label={"Name"}/>
                                            <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "race")} name={"race"} label={"Race"} />
                                            <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "gender")} name={"gender"} label={"Gender"} />
                                            <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "characterClass")} name={"characterClass"} label={"Class"} />
                                        </Grid>
                                    </Paper>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid container direction="row" spacing={2}>
                                      <Card>
                                        <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "role")} name={"role"} label={"Role"} />
                                        <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "profession")} name={"profession"} label={"Profession"} />
                                        <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "intro")} name={"intro"} label={"Short intro"} />
                                      </Card>
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
                                                <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "alignment")} name={"alignment"} label={"Alignment"} />
                                                <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "size")} name={"size"} label={"Size"} />
                                                <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "type")} name={"type"} label={"Type"} />
                                                <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "subtype")} name={"subtype"} label={"Subtype"} />
                                                <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "organisation")} name={"organisation"} label={"Organisation"} />
                                                <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "age")} name={"age"} label={"Age"} />
                                                <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "cr")} name={"cr"} label={"Challenge rating (CR)"} />
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
                                                <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "ac")} label={"AC"} name={"ac"}/>
                                                <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "hp")} name={"hp"} label={"HP"}/>
                                                <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "fort")} name={"fort"}  label={"Fort"} />
                                                <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "ref")} name={"ref"} label={"Ref"} />
                                                <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "will")} name={"will"} label={"Will"} />
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
                                                <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "initiative")} name={"initiative"} label={"Initiative"}/>
                                                <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "speed")} name={"speed"} label={"Speed"}/>
                                                <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "melee")} name={"melee"} label={"Melee"}/>
                                                <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "specialattacks")} name={"specialattacks"} label={"Special attacks"}/>
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
                                                <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "beforeCombat")} name={"beforeCombat"} label={"Before Combat"}/>
                                                <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "duringCombat")} name={"duringCombat"} label={"During Combat"} />
                                                <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "combatGear")} name={"combatGear"} label={"Combat Gear"} />
                                            </ExpansionPanelDetails>
                                        </ExpansionPanel>
                                    </Grid>
                                </Grid>

                                <Button type="submit" className={styles.button} variant="contained" color="primary">
                                    Save
                                </Button>
                                <Button type="button" onClick={event => {
                                    let util = new utilities();
                                    let name = document.getElementById("name").value;
                                    console.log(name);
                                    let charToDelete = {
                                        name: name
                                    };
                                        util.sendToServer(charToDelete,"DELETE");
                                }} className={styles.Button} variant="contained" color="secondary">
                                    Remove
                                </Button>
                            </Grid>
                        </form>
                    )}
                </Form>
            </Segment>
        )
    }
}


export default Character;
