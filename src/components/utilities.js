//todo: virheenkäsittely
//lähettää lomakkeen sisällön palvelimelle
//todo: virheenkäsittely
//lähettää lomakkeen sisällön palvelimelle
import store from "../redux/Store";

class utilities {

    //todo: tee staattinen
    /**
     *
     * @param data payload to send to server
     * @param method HTTP method e.g post or get
     * @param type formType e.g "settlement" or "character"
     * @returns {Promise<void>}
     */
    async sendToServer(data, method, type) {
        const url = "/users";
        let body = {};
        body["user"] = "testi";
        body["formType"] = type;
        body["data"] = data;
        if (method === null) method = "post";
        console.log("data: ");
        console.log(data);
        try {
            const response = await fetch(url, {
                method: method,
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            console.log('Success:', JSON.stringify(json));
        } catch (error) {
            console.error('Error:', error);
        }
    }

    static async initializeStore() {
        let response = await fetch('/users', {
            credentials: "omit",
            cache: "no-store",
            method: "get"
        });
        let data = await response.json();
        console.log(data);
        let chars = [];     //hakee palvelimelta kaikki käyttäjän kaupungit ja hahmot
        let settlements = [];
        let logs = [];
        let quests = [];
        for (let i = 0; i < data.length; i++) {
            let char = data[i]["data"]; //lisätään lomake vastavaan listaan
            switch (data[i].type) {
                case "character":
                    chars.push(char);
                    break;
                case "settlement":
                    settlements.push(char);
                    break;
                case "quest":
                    quests.push(char);
                    break;
                default:
                    break;
            }

        }
        store.dispatch({
            type: "initialise",
            payload: {
                characters: chars,
                settlements: settlements,
                logs: logs,
                quests: quests
            }
        });

    }
}


export default utilities;