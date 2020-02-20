import React from "react";
import styles from "../styles/HPCounter.module.css";
import {Segment} from "semantic-ui-react";
class HPCounter extends React.Component {

    constructor(props) {
        super(props);
        this.label = props.label;
        this.state = {value: parseInt(props.initialValue)};
    }

    modify(value) {
        let newValue = this.state.value + value;
        this.setState({value: newValue});
        console.log("value");
    }

    render() {
        let modifier = 0;
        return (
            <div>
                <Segment className={styles.Paper}>
                    <h3>{this.label}</h3>
                    {this.state.value}
                    <input defaultValue={""} onChange={event => modifier = parseInt(event.target.value)} placeholder="Modifier" />
                    <button onClick={event => this.modify(modifier)}>Apply</button>
               </Segment>
            </div>
            )

    }

}
export default HPCounter;