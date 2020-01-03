//todo: virheenkäsittely
//lähettää lomakkeen sisällön palvelimelle
import Character from "./Character";

//todo: virheenkäsittely
//lähettää lomakkeen sisällön palvelimelle
class utilities {

    //todo: tee staattinen
    async sendToServer(data, method) {
        const url = "/users";
        data["user"] = "testi";
        if (method === null) method = "post";
        console.log(data);
        try {
            const response = await fetch(url, {
                method: method,
                body: JSON.stringify(data),
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