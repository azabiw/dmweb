import React from "react";
import Paper from "@material-ui/core/Paper";
import styles from "./styles/HPCounter.module.css"

class HPCounter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: props.initialValue};
    }

    modify(value) {
        let newValue = this.state.value + value;
        this.setState({value: newValue});
    }

    render() {
        return (
            <div>
                <Paper className={styles.Paper}>
                    {this.state.value}
                    <button onClick={event => this.modify(-1)}>-1</button>
                    <input />
                    <button onClick={event => this.modify(1)}>+1</button>
               </Paper>
            </div>
            )

    }

}
export default HPCounter;