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
        let properties = this.props.properties ?? [];
        console.log("proops", properties);
        this.state = {
            properties: properties,
            idOfDefault: idOfDefault
        }
        //properties for example characters or settlements

        this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    }

    /** TODO: KORJAA
     * workaround tilan muuttamiseksi. 
     * Tämä ei ole tehon kannalta suositeltava ratkaisu, mutta ottaen huomioon lomakkeiden määrän, vaikutus ei ole kovinkaan vakava.
     * Voidaan ratkaista hakemalla redux storesta arvot, mutta se lisää muistin käyttöä vastaavassa määrin.
     * @param {} nextProps 
     */
    componentWillReceiveProps(nextProps){
        this.setState({
            properties: nextProps.properties
        })
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