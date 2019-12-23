import React from "react";
//tekstikenttä, joka siirtää arvonsa ylemmälle elementille.

class Field extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ""};
    }
    render() {
        let id = this.props.label + "TextField";
        return (
            <div className="InputFieldContainer">
                <label id={id} className="FieldLabel">{this.props.label}
                    <textarea defaultValue={this.props.text}
                    />
                </label>
            </div>
        )

    }

}
export default Field;
