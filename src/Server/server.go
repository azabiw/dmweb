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
	dataStore = append(dataStore, form)
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
	fmt.Println(form.Payload)
	fmt.Println(form.FormType)

	save(form) //tallennetaan requestissa tullut lomake tietorakenteeseen

	json.NewEncoder(w).Encode(form)
}

func loadData() DataStore {
	payload := DataStore{
		FormData{Payload: "testi", FormType: "testi"},
		FormData{Payload: "toinen tesit", FormType: "testi"},
	}

	return payload
}

func handleRequests() {
	var port string = ":10000"
	router := mux.NewRouter()

	router.HandleFunc("/api", getAllForms).Methods("GET")
	router.HandleFunc("/api", addForm).Methods("POST")
	router.HandleFunc("/", homePage)

	fmt.Println("server started", port)
	log.Fatal(http.ListenAndServe(port, router))
}

func main() {
	fmt.Println("Starting server")
	dataStore = loadData()

	handleRequests()
}
