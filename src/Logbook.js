import React from "react";


class Logbook extends React.Component {
    constructor(props) {
        super();
        this.addEntry = this.addEntry.bind(this);
        this.state = {
            entries: []
        };

    }

    addEntry(text) {
        let entries = this.state.entries;
        let newEntry = {
            content: text,
            date: Date()
        };
        entries.push(newEntry);
        console.log(newEntry);
        this.setState({entries: entries});
    }

    render() {
        return (
            <div>
                <h2>Logbook</h2>

                <textarea placeholder="Log entry text"> </textarea>
                <button onClick={this.addEntry}>Add log entry </button>
            </div>
        )
    }
} export default Logbook;