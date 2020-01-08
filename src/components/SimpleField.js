import {Field} from "react-final-form";
import React from "react";

/**
 *
 * @param props label, defaultText, name and id
 * @returns {*}
 * @constructor
 */
const SimpleField = (props ) => {
    return (
        <div >
            <label>{props.label}</label>
            <Field id={props.id} defaultValue={props.defaultText} name={props.name} component="input" type="text" placeholder={props.label} />
        </div>
    )
};
export default SimpleField;