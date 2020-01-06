import React from "react";
import Paper from "@material-ui/core/Paper";


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
                <Paper className={"paper"}>
                    {this.state.value}
                    <input/>
                    <button onClick={event => this.modify(-1)}>-1</button>
                    <button onClick={event => this.modify(1)}>+1</button>
               </Paper>
            </div>
            )

    }

}
export default HPCounter;