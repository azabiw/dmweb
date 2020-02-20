import React from "react";
import HPCounter from "./HPCounter";
import {Container, Segment} from "semantic-ui-react";
import styles from "../styles/HPCounterContainer.module.css";
class HPCounterContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {counters: []};
        this.addCounter = this.addCounter.bind(this);
    }
    addCounter(name, value) {
        let counters = this.state.counters;
        const counter = <HPCounter label={name} initialValue={value} />;
        counters.push(counter);
        this.setState({counters: counters});
        console.log("counter added");
        console.log(this.state.counters);
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
                    <input placeholder="Name" onChange={event => label = event.target.value} />
                    <input placeholder="HP" onChange={event => value = event.target.value}/>
                    <button className={styles.button} onClick={event => this.addCounter(label,value)}>Add a New Character</button>
                </Segment>
            </Container>
        )
    }
} export default HPCounterContainer;