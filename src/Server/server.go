package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"github.com/gorilla/mux"
	"io/ioutil"
)

var dataStore DataStore

//Yksittäinen lomake esim yksittäisen hahmon tiedot
type FormData struct {
	Payload  string `json:"payload"`
	FormType string `json:"formtype"`
	ID string `json:"id"`
}

type DataStore []FormData

func homePage(w http.ResponseWriter, r *http.Request) {
	/*fmt.Fprintf(w, "Welcome to the HomePage!")*/

	method := r.Method

	fmt.Println(method)

	if method == "GET" {
		fmt.Println("GET request")
	}
	json.NewEncoder(w).Encode(dataStore)
	fmt.Println("Endpoint Hit: homePage")
}

func save(form FormData) {
	
	for i, element := range dataStore { //tarkastetaan onko tietorakenteessa jo samalla ID:llä olevaa lomaketta
		if element.ID == form.ID {
			dataStore[i] = form
			fmt.Println("form edited with ID", form.ID)
			return
		} 
	} 
	dataStore = append(dataStore, form)
	fmt.Println("new form added", form.FormType, form.ID)
}


//Lähettää asiakkaalle koko dataStoren sisällön
func getAllForms(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(dataStore)
}



//Lisää tietorakenteeseen uuden lomakkeen
// testirequest: {"Payload": "huomenta", "FormType": "asdasdasd"}
func addForm(w http.ResponseWriter, r *http.Request) {
	reqBody, _ := ioutil.ReadAll(r.Body)
    var form FormData 
	json.Unmarshal(reqBody, &form)
	/*fmt.Println(form.Payload)
	fmt.Println(form.FormType)*/

	go save(form) //tallennetaan requestissa tullut lomake tietorakenteeseen

	json.NewEncoder(w).Encode(form) //lähetetään vastauksena sama lomake
}

func loadData() DataStore {
	payload := DataStore{
		FormData{Payload: "testi", FormType: "testi", ID: "0"},
		FormData{Payload: "toinen tesit", FormType: "testi", ID: "1"},
	}

	return payload
}

func handleRequests() {
	var port string = ":10000"
	router := mux.NewRouter()

	router.HandleFunc("/api", getAllForms).Methods("GET")
	router.HandleFunc("/api", addForm).Methods("POST")
	router.HandleFunc("/api", addForm).Methods("PUT")

	router.HandleFunc("/", homePage)

	fmt.Println("server started", port)
	log.Fatal(http.ListenAndServe(port, router))
}

func main() {
	fmt.Println("Starting server")
	dataStore = loadData()

	handleRequests()
}
