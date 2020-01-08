import React from "react";


class Logbook extends React.Component {
    constructor(props) {
        super();
        this.addEntry = this.addEntry.bind(this);
        this.removeEntry = this.removeEntry.bind(this);
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

    /**
     *
     * @param date used to identify targeted entry to be deleted
     */
    removeEntry(date) {
        let entries = this.state.entries;
        if (entries.length <1) return;
        for (let i = 0; i < entries.length; i++) {
            let entry = entries[i];
            if (entry === null) return;
            if (entry.date === date) {
                delete entries[i];
                this.setState({entries: entries});
                return;
            }
        }

    }

    render() {
        let  formValue = "";
        const entries = this.state.entries.map(entry =>
            <div>Content: {entry.content} Date: {entry.date} <button onClick={event => this.removeEntry(entry.date)}>Delete</button></div>
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