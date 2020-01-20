import React from "react";
import {Container, Card} from "semantic-ui-react";
import styles from "../styles/Logbook.module.css"
import {Connect} from "react-redux";
import store from "../redux/Store";
class Logbook extends React.Component {
    localstore;
    constructor(props) {
        super(props);
        this.addEntry = this.addEntry.bind(this);
        this.removeEntry = this.removeEntry.bind(this);
        this.state = {
            entries: []
        };

        this.handleChange = store.subscribe(this.handleChange);
        this.setState(store.getState());
        console.log(this.state);
    }
    handleChange() {
        //this.setState() = store.getState().logs;
        console.log("got data from store");
        console.log(store.getState());
    }
    /**
     *
     * @param text
     */
    addEntry(text) {
        if (text === "" || text === null) return; //ei lisätä tyhjää
        let entries = this.state.entries;
        let newEntry = {
            content: text,
            date: Date()
        };
        entries.push(newEntry);
        //console.log(newEntry);
        this.setState({entries: entries});
        store.dispatch({type: "log/add", payload: newEntry});
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
            <Container className={styles.Container}>
                <h2 className={styles.Title}>Logbook</h2>
                {entries}
                <div>
                  <label>Log entry text</label>
                  <textarea className={styles.TextArea} onChange={event => formValue = event.target.value} placeholder="Log entry text"> </textarea>
                  <button onClick={event => this.addEntry(formValue)}>Add log entry </button>
                </div>
            </Container>
        )
    }
} export default Logbook;
