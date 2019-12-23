import React from "react";
import Grid from "@material-ui/core/Grid";
//tekstikenttä, joka siirtää arvonsa ylemmälle elementille.

class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ""};
    }
    render() {
        let id = this.props.label + "TextField";
        return (
            <Grid item xs={3}>
                <div className="InputFieldContainer">
                    <label id={id} className="FieldLabel">{this.props.label}
                        <textarea defaultValue={this.props.text}
                        />
                    </label>
                </div>
            </Grid>
        )

    }

}
export default Field;
