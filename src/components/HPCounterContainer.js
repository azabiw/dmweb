import React from "react";
import HPCounter from "./HPCounter";
import {Container, Segment} from "semantic-ui-react";
import styles from "../styles/HPCounterContainer.module.css";

/**
 * Elämälaskuri, jolla voidaan lisätä dynaamisesti uusia laskureita annetuilla nimillä ja elämän määrillä.
 */
class HPCounterContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {counters: []};
        this.addCounter = this.addCounter.bind(this);
    }
    addCounter(name, fieldValue) {
        let value = parseInt(fieldValue, 10);
        let counters = this.state.counters;
        if (isNaN(value)) {
            console.error("incorrect field value", fieldValue);
            this.clearFields();
            return;
        }
        const counter = <HPCounter label={name} initialValue={value} />;
        counters.push(counter);
        this.setState({counters: counters});
        console.log("counter added");
        console.log(this.state.counters);
        this.clearFields();
    }


    /**
     * Tyhjentää kentät
     */
    clearFields() {  
       let fields =  ["nameField", "hpField"];
       for (let id of fields) {
        let field = document.getElementById(id);
        field.value = "";
       }
        
    
    }

    render(){
        let label = "New Character";
        let value = 10; //default value
        return (
            <Container>
                <Segment>
                    <div>{this.state.counters}</div>
                    <h3>Add a new HP counter</h3>
                    <p>These counters are local only and will not be synced with the server.</p>
                    <input id="nameField" placeholder="Name" onChange={event => label = event.target.value} />
                    <input type="number" id="hpField" placeholder="HP" onChange={event => value = event.target.value}/>
                    <button className={styles.button} onClick={event => this.addCounter(label,value)}>Add a New Character</button>
                </Segment>
            </Container>
        )
    }
} export default HPCounterContainer;