import {Field} from "react-final-form";
import React from "react";
import styles from "../styles/SimpleField.module.css";
/**
 *
 * @param props label, defaultText, name and id
 * @returns {*}
 * @constructor
 */
const SimpleField = (props ) => {
    return (
        <div className={styles.container}>
            <label>{props.label}</label>
            <Field id={props.id} defaultValue={props.defaultText} name={props.name} component="input" type="text" placeholder={props.label} />
      </div>
    )
};
export default SimpleField;
