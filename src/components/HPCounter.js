import React from "react";
import styles from "../styles/HPCounter.module.css";
import {Button, Segment} from "semantic-ui-react";
class HPCounter extends React.Component {
    #id;
    constructor(props) {
        super(props);
        this.label = props.label;
        this.state = {value: parseInt(props.initialValue)};
    }

    modify(value) {
        let newValue = this.state.value + value;
        this.setState({value: newValue});
        console.log("value");
        this.clearField();
    }

    clearField() {
        let field = document.getElementById(this.id);
        field.value = "";
    }

    render() {
        let modifier = 0;
        this.id = this.label;
        return (
            <div>
                <Segment className={styles.Paper}>
                    <h3>{this.label}</h3>
                    {this.state.value}
                    <input className="modifier" id={this.label} defaultValue={""} onChange={event => modifier = parseInt(event.target.value)} placeholder="Modifier" />
                    <Button primary onClick={event => this.modify(modifier)}>Apply</Button>
                    <Button secondary onClick={event => this.clearField()}>Clear</Button>
               </Segment>
            </div>
            )

    }

}
export default HPCounter;