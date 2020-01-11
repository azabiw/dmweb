import React from "react";
import Paper from "@material-ui/core/Paper";
import styles from "../styles/HPCounter.module.css"

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
                <Paper className={styles.Paper}>
                    <h3>{this.label}</h3>
                    {this.state.value}
                    <input defaultValue={""} onChange={event => modifier = parseInt(event.target.value)} placeholder="Modifier" />
                    <button onClick={event => this.modify(modifier)}>Apply</button>
               </Paper>
            </div>
            )

    }

}
export default HPCounter;