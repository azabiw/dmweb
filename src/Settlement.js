import React from "react";
import Field from "./Field";
import Button from "@material-ui/core/Button";
import "./utilities";
import utilities from "./utilities";
class Settlement extends React.Component {
    #id = 0;
    name = "New Settlement";
    leader;
    characters = [];
    render() {
        return (
            <form id="inputForm">
                <Field label={"Name"} text={""}/>
                <select className="SettlementLeaderSelector">
                    <option value="testi">Character 1</option>
                    <option value="testi2">Character 2</option>
                    <option value="testi">Character 3</option>
                </select>
                <Button className="saveButton" variant="contained" color="primary" onClick={utilities.save}>
                    Save
                </Button>
            </form>
        )
    }

}
export default Settlement;
