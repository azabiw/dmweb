import React from "react";
import styles from "../styles/HPCounter.module.css";
import {Button, Segment} from "semantic-ui-react";

/**
 * Yksittäinen elämien laskemiseen käytetty työkalu.
 * Käytetään vain HPCounterContainerissa, joka lisää yksittäisiä laskureita tarvittaessa dynaamisesti.
 */
class HPCounter extends React.Component {
    #id;
    constructor(props) {
        super(props);
        this.label = props.label;
        this.state = {value: parseInt(props.initialValue)};
    }

    modify(value) {
        value = parseInt(value, 10);
        if (isNaN(value)) {
            console.error("incorrect field value", value);
            this.clearField();
            return;
        }

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
                    <input type="number" className="modifier" id={this.label} defaultValue={""} onChange={event => modifier = parseInt(event.target.value)} placeholder="Modifier" />
                    <Button primary onClick={event => this.modify(modifier)}>Apply</Button>
                    <Button secondary onClick={event => this.clearField()}>Clear</Button>
               </Segment>
            </div>
            )

    }

}
export default HPCounter;