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
        if (text === "" || text === null) return; //ei lisätä tyhjää
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
        let  formValue = "";
        const entries = this.state.entries.map(entry =>
            <div>Content: {entry.content} Date: {entry.date}</div>
        );
        return (
            <div>
                <h2>Logbook</h2>
                {entries}
                <textarea onChange={event => formValue = event.target.value} placeholder="Log entry text"> </textarea>
                <button onClick={event => this.addEntry(formValue)}>Add log entry </button>
            </div>
        )
    }
} export default Logbook;