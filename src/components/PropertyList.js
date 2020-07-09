import store from "../redux/Store";
import React from "react";
import {Rail, Segment, Button} from "semantic-ui-react";
import {Link} from "react-router-dom";
import styles from "../styles/PropertyList.module.css";
import AddNewFormButton from "./AddNewFormButton";

class PropertyList extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
       this.unsubscribe = store.subscribe(this.handleChange);
        this.state = {
            characters: store.getState().forms.character ?? [],
            settlements: store.getState().forms.settlement ?? [],
        }

    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    handleChange() {
        this.setState({
            characters: store.getState().forms.character ?? [],
            settlements: store.getState().forms.settlement ?? []
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
            <li key={char.id} className={styles.ListElement}><Button  as={Link} to={`/editor/${char.id}`}>{char.name ? char.name : "No name"}</Button></li>
        );
        const settlementList = this.state.settlements.map((settlement) =>
            <li key={settlement.id} className={styles.ListElement}><Button  as={Link} to={`/editor/${settlement.id}`}>{settlement.name ? settlement.name: "No name"}</Button></li>
        );

        return (
            <Rail close="very" position="left" >
                <Segment className="LeftNavigation" id="leftList">
                    <h3>List of NPCs:</h3>
                    <ul className={styles.list}>{characterList}</ul>
                    <h3>List of Settlements: </h3>
                    <ul className={styles.list}>{settlementList}</ul>
                    
                    
                    <AddNewFormButton key={"newFormBTN"} />

                </Segment>
            </Rail>
        )
    }
}
export default PropertyList;