import store from "../redux/Store";
import React from "react";
import {Rail, Segment, Button} from "semantic-ui-react";
import {Link} from "react-router-dom";
import styles from "../styles/PropertyList.module.css";
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
        //console.log(store.getState());
    }

    setEditable(editable, type) {
      //  console.log("id = " + editable.id);
        store.dispatch({type: "editable/set", payload:editable, editType: type});
    }
    render() {
        const characterList = this.state.characters.map((char) =>
            <li className={styles.ListElement}><Button  as={Link} to={`/editor/${char.id}`}>{char.name ? char.name : "No name"}</Button></li>
        );
        const settlementList = this.state.settlements.map((settlement) =>
            <li className={styles.ListElement}><Button  as={Link} to={`/editor/${settlement.id}`}>{settlement.name ? settlement.name: "No name"}</Button></li>
        );

        return (
            <Rail close="very" position="left" >
                <Segment className="LeftNavigation" id="leftList">
                    <h3>List of NPCs:</h3>
                    <ul className={styles.list}>{characterList}</ul>
                    <h3>List of Settlements: </h3>
                    <ul className={styles.list}>{settlementList}</ul>
                    <Button className={styles.ListElement} as={Link} to="/editor/new" primary >Add a new Character</Button>
                    <Button className={styles.ListElement} as={Link} to="/editor" onClick={(event => store.dispatch({type:"editable/set", payload: []}))} primary >Add a new Settlement</Button>
                </Segment>
            </Rail>
        )
    }
}
export default PropertyList;