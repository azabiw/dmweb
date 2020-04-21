import React from "react";
import utilities from "./Utilities";
import {Form, Field} from "react-final-form";
import SimpleField from "./SimpleField";
import styles from "../styles/characterform.module.css";
import {Card, Segment, Grid, Button} from "semantic-ui-react";
import store from "../redux/Store";
import v4 from 'uuid/v4';
import {Link, Redirect} from "react-router-dom";
class Character extends React.Component{
    #isNew = true;
    constructor(props){
        let defaultCharacter = store.getState().editable;
        super(props);
        if (defaultCharacter !== []) this.isNew = false;
        console.log("is new tila: " + this.#isNew);
        this.state = {
            customFields: [],
            defaultCharacter: defaultCharacter,
            isNew:false,
            redirect: false
        };
        this.handleChange = this.handleChange.bind(this);
        store.subscribe(this.handleChange);
    }
    

    handleChange() {
        let storeState = store.getState().editable;
        console.log("edit type in store" + storeState.editType);
        let isNew = false;
        if (storeState !== []) isNew = true;
        if (true || storeState.editType === "characters") { //todo: korjaa tyyppi
            this.setState({
                defaultCharacter: storeState,
                isNew: isNew
            });
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
        if (this.state.redirect === true) {
            return <Redirect to="/editor" />
        }
        return (
            <Segment className={styles.editor}>
                <h3>Edit NPC</h3>
                <Form onSubmit={(formData) => {
                    utilities.handleFormData(formData,this.state.defaultCharacter, "character", "characters/add",this.state.isNew);
                    this.setState({redirect: true});
                } }>
                    {({handleSubmit}) => (
                        <form onSubmit={handleSubmit} id="inputForm">
                            <SimpleField id={"name"} defaultText={this.getDefault(this.state.defaultCharacter, "name")} name={"name"} label={"Name"}/>
                            <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "race")} name={"race"} label={"Race"} />
                            <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "gender")} name={"gender"} label={"Gender"} />
                            <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "characterClass")} name={"characterClass"} label={"Class"} />
                            <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "role")} name={"role"} label={"Role"} />
                            <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "profession")} name={"profession"} label={"Profession"} />
                            <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "intro")} name={"intro"} label={"Short intro"} />
                            <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "alignment")} name={"alignment"} label={"Alignment"} />
                            <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "size")} name={"size"} label={"Size"} />
                            <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "type")} name={"type"} label={"Type"} />
                            <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "subtype")} name={"subtype"} label={"Subtype"} />
                            <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "organisation")} name={"organisation"} label={"Organisation"} />
                            <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "age")} name={"age"} label={"Age"} />
                            <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "cr")} name={"cr"} label={"Challenge rating (CR)"} />
                            <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "ac")} label={"AC"} name={"ac"}/>
                            <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "hp")} name={"hp"} label={"HP"}/>
                            <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "fort")} name={"fort"}  label={"Fort"} />
                            <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "ref")} name={"ref"} label={"Ref"} />
                            <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "will")} name={"will"} label={"Will"} />
                            <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "initiative")} name={"initiative"} label={"Initiative"}/>
                            <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "speed")} name={"speed"} label={"Speed"}/>
                            <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "melee")} name={"melee"} label={"Melee"}/>
                            <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "specialattacks")} name={"specialattacks"} label={"Special attacks"}/>
                            <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "beforeCombat")} name={"beforeCombat"} label={"Before Combat"}/>
                            <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "duringCombat")} name={"duringCombat"} label={"During Combat"} />
                            <SimpleField defaultText={this.getDefault(this.state.defaultCharacter, "combatGear")} name={"combatGear"} label={"Combat Gear"} />

                            <Button type="submit" primary>
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
                                utilities.initializeStore();
                                this.setState({redirect: true}); //poistutaan sivulta.
                            }}  color="red">
                                Remove
                            </Button>
                        </form>
                    )}
                </Form>
            </Segment>
        )
    }
}


export default Character;
