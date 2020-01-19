import store from "../redux/Store";
import React from "react";
import {Rail, Segment} from "semantic-ui-react";
import Button from "@material-ui/core/Button";
class PropertyList extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange = store.subscribe(this.handleChange);
        this.state = {
            characters: store.getState().characters,
            settlements: store.getState().settlements
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


    render() {
        const characterList = this.state.characters.map((char) =>
            <li><button onClick={(event => this.props.editCharacter(event.target.textContent))}>{char.name}</button></li>
        );
        const settlementList = this.state.settlements.map((settlement) =>
            <li><button onClick={(event => this.props.editProperty(event.target.textContent, "settlements"))}>{settlement.name}</button></li>
        );

        return (
            <Rail close="very" position="left" >
                <Segment className="LeftNavigation" id="leftList">
                    <h3>List of NPCs:</h3>
                    <ul>{characterList}</ul>
                    <h3>List of Settlements: </h3>
                    <ul>{settlementList}</ul>
                    <Button onClick={(event => this.props.editCharacter(""))} variant="contained" color="primary">Add new Character</Button>
                    <Button onClick={(event => this.props.editProperty("","settlements"))} variant="contained" color="primary">Add new Settlement</Button>
                </Segment>
            </Rail>
        )
    }
}
export default PropertyList;