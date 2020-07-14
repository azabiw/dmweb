import {Field} from "react-final-form";
import React from "react";
import styles from "../styles/SimpleField.module.css";
/**
 * Yksittäinen tekstikenttä otsikolla. 
 */
const SimpleField = (props ) => {
    return (
        <div className={styles.container}>
            <label className={styles.Label}>{props.label}</label>
            <Field id={props.id} defaultValue={props.defaultText} name={props.name} component="input" type="text" placeholder={props.label} />
        </div>
    )
};
export default SimpleField;
