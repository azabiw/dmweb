//todo: virheenkäsittely
//lähettää lomakkeen sisällön palvelimelle
import Character from "./Character";

//todo: virheenkäsittely
//lähettää lomakkeen sisällön palvelimelle
class utilities {

    async sendToServer(data) {
        const url = "/users";
        data["user"] = "testi";
        console.log(data);
        try {
            const response = await fetch(url, {
                method: 'POST', // or 'PUT'
                body: JSON.stringify(data), // data can be `string` or {object}!
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
    save() {
        let fields = document.getElementsByClassName("InputFieldContainer");
        let data = [];
        data.push({username: "testUser1"});
        for (let field of fields) {
            console.log(field);
            let name = field.childNodes[0].textContent;
            let text = field.childNodes[0].childNodes[1].value;
            let row = {propertyName : name, value:text};
            data.push(row);
        }
        console.log();
        const character = new Character();
        character.fromJSON(data);
        console.log(character);
        this.sendToServer(character);
    }

}


export default utilities;