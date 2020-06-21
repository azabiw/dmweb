import React from "react";
import { Button, Label} from "semantic-ui-react";

class AddFieldContainer extends React.Component {
    render () {
     let fieldName = "";
     let fieldType = "text";
    return (
        <div className={"addfieldContainer"}>
            <Label>
                Field name
                <input id={"Fieldname"} onChange={
                    e => fieldName=e.target.value
                } />
            </Label>
            <label for="fieldTypeSelector">Field type</label>
            <select id="fieldTypeSelector" onChange={e => fieldType=e.target.value}> 
                <option value="text">Text</option>
                <option value="selection">Selection</option>
            </select>
            <Button  type="button" onClick={e => this.props.handleAddFieldClick(fieldName, fieldType)}>Add a new field</Button>
        </div>
    )
}

}
export default AddFieldContainer;
