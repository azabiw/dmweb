import React from "react";
import { Button, Label} from "semantic-ui-react";

class AddFieldContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fieldType: "text",
            selectiontype: "",
            fieldName: ""

        }
        this.onSelectionTypeChange = this.onSelectionTypeChange.bind(this);
    }

    /**
     * Asettaa uuden valinnantyypin tilaan
     * @param {strig} newSelectionType 
     */
    onSelectionTypeChange(newSelectionType) {
        this.setState({
            selectiontype: newSelectionType,
        });
    }

    render () {
        const supportedTypes =  ["character", "settlement"]; //TODO: muuta dynaamiseksi

    return (
        <div className={"addfieldContainer"}>
            <Label>
                Field name
                <input id={"Fieldname"} onChange={
                    e => this.setState({fieldName:e.target.value})
                } />
            </Label>
            <label for="fieldTypeSelector">Field type</label>
            <select value={this.state.fieldType} id="fieldTypeSelector" onChange={e => this.setState({fieldType:e.target.value})}> 
                <option value="text">Text</option>
                <option value="selector">Selection</option>
            </select>
            <SelectorFieldTypeSelector value={this.state.selectiontype} onChange={this.onSelectionTypeChange} options={supportedTypes} visible={(this.state.fieldType === "selector")}/>
            <Button  type="button" onClick={e => this.props.handleAddFieldClick(this.state.fieldName, this.state.fieldType, this.state.selectiontype)}>Add a new field</Button>
        </div>
    )
}

}


class  SelectorFieldTypeSelector extends React.Component {

    render() {
    let options = this.props.options.map(type => <option value={type}>{type}</option>)
        if(this.props.visible === false) {
            return <React.Fragment></React.Fragment>
        } else {
            return (
                <React.Fragment>
                    <select value={this.props.value} id="selectionTypeSelector" onChange={event => this.props.onChange(event.target.value)}>
                        <option value="">Not selected</option>
                        {options}
                    </select>

                </React.Fragment>
            )
        }
    }
}

export default AddFieldContainer;
