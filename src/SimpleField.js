import {Field} from "react-final-form";
import React from "react";

const SimpleField = (props ) => {
    return (
        <div >
            <label>{props.label}</label>
            <Field defaultValue={props.defaultText} name={props.name} component="input" type="text" placeholder={props.label} />
        </div>
    )
};
export default SimpleField;