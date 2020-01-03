//todo: virheenkäsittely
//lähettää lomakkeen sisällön palvelimelle
//todo: virheenkäsittely
//lähettää lomakkeen sisällön palvelimelle
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
        data["user"] = "testi";
        data["formType"] = type;
        if (method === null) method = "post";
        console.log("data: ");
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
}


export default utilities;