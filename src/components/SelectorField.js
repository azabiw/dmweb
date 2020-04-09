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
        this.state = {
            properties: this.props.properties
        }
        //properties for example characters or settlements
    }

    render() {
        const propertyList = this.state.properties.map((property) =>
            <option value={property.id}> {property.name} </option>
        );
        return (
            <div>
                <label>{this.props.label}</label>
                <Field initialValue={this.props.idOfDefault} name={this.props.name} component="select">
                    <option value={"Not selected"}> {"Not selected"} </option>
                    {propertyList}
                </Field>

            </div>
        )
    }
} export default SelectorField;