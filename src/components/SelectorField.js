import React from "react";
import {Field} from "react-final-form";

/**
 * Required props:
 * idOfDefault
 * properties
 * name
 */
class SelectorField extends React.Component {
    constructor(props) {
        super(props);
        let idOfDefault = ( this.props.idOfDefault != null) ? this.props.idOfDefault : "Not selected";
        this.state = {
            properties: this.props.properties,
            idOfDefault: idOfDefault
        }
        //properties for example characters or settlements
    }

    render() {
        let properties = this.state.properties ? this.state.properties : [];
        const propertyList = properties.map((property) =>
            <option value={property.id}> {property.name ? property.name : "No name"} </option>
        );
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