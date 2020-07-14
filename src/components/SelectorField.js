import React from "react";
import {Field} from "react-final-form";
import store from "../redux/Store";

/**
 * Required props:
 * idOfDefault
 * properties
 * name
 */
class SelectorField extends React.Component {
    constructor(props) {
        super(props);
        //console.log(this.props);
        let idOfDefault = ( this.props.idOfDefault != null) ? this.props.idOfDefault : "Not selected";
        this.selectiontype = this.props.selectiontype;
        let properties = store.getState().forms[this.selectiontype];
        //console.log("props for selector field", properties);
        this.state = {
            idOfDefault: idOfDefault,
            properties:properties
        }
        //properties for example characters or settlements
        this.handleChange = this.handleChange.bind(this);

        this.unsubscribe = store.subscribe(this.handleChange);
    }

    handleChange() {
        let properties = store.getState().forms[this.selectiontype];
        this.setState({
            properties:properties
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        let propertyList;
        if (this.state.properties !== undefined) {
            propertyList = this.state.properties.map((property) =>
            <option key={property.id} value={property.id}> {property.name ? property.name : "No name"} </option>
            );
        } else {
            return <div>

            </div>
        }
        return (
            <div>
                <label>{this.props.label}</label>
                <Field initialValue={this.state.idOfDefault} name={this.props.name} component="select">
                    <option value={"Not selected"}> {"Not selected"} </option>
                    {propertyList}
                </Field>

            </div>
        )
    }
} export default SelectorField;