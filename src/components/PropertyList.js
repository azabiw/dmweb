import store from "../redux/Store";
import React from "react";
import {Rail, Segment} from "semantic-ui-react";
import Button from "@material-ui/core/Button";
import {Redirect } from "react-router-dom";
class PropertyList extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange = store.subscribe(this.handleChange);
        this.state = {
            characters: store.getState().characters,
            settlements: store.getState().settlements,
            redirect: false
        }

    }

    handleChange() {
        console.log(store.getState().characters);
        this.setState({
            characters: store.getState().characters,
            settlements: store.getState().settlements
        });
        console.log("got data from store");
        console.log(store.getState());
    }

    setEditable(editable, type) {
        console.log("id = " + editable.id);
        store.dispatch({type: "editable/set", payload:editable, editType: type});
    }
    render() {
        const characterList = this.state.characters.map((char) =>
            <li><button onClick={(event => this.setEditable(char, "characters"))}>{char.name}</button></li>
        );
        const settlementList = this.state.settlements.map((settlement) =>
            <li><button onClick={(event => this.setEditable(settlement, "settlements"))}>{settlement.name}</button></li>
        );

        return (
            <Rail close="very" position="left" >
                <Segment className="LeftNavigation" id="leftList">
                    <h3>List of NPCs:</h3>
                    <ul>{characterList}</ul>
                    <h3>List of Settlements: </h3>
                    <ul>{settlementList}</ul>
                    <Button onClick={(event => store.dispatch({type:"editable/set", payload: []}))} variant="contained" color="primary">Add new Character</Button>
                    <Button onClick={(event => store.dispatch({type:"editable/set", payload: []}))} variant="contained" color="primary">Add new Settlement</Button>
                </Segment>
            </Rail>
        )
    }
}
export default PropertyList;