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
//TODO gracefull shutdown

type formField struct {
	Name string `json:"name"`
	FieldType string `json:"fieldtype"`
	SelectionType string `json:"selectionType"`
	Value string `json:"value"`
}

//Yksittäinen lomake esim yksittäisen hahmon tiedot
type FormData struct {
	Payload  []formField `json:"payload"`
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


func handleRemove(w http.ResponseWriter, r *http.Request) {
	reqBody, _ := ioutil.ReadAll(r.Body)
    var form FormData 
	json.Unmarshal(reqBody, &form)

	go removeFormWithID(form.ID) //poistetaan toisessa goroutinessa jotta säästetään vähän aikaa 

	json.NewEncoder(w).Encode(form) //TODO: keksi parempi kuittaus
}

//Poistaa datarakenteesta annettua ID:tä vastaavan lomakkeen
//TODO: Skaalautuvampi ratkaisu
func removeFormWithID(ID string) { 
	for i, element := range dataStore {
		if (element.ID == ID) {
			dataStore = append(dataStore[:i], dataStore[i+1])
		}
	}
}

//Lähettää asiakkaalle koko dataStoren sisällön
func getAllForms(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	fmt.Println("Request")
	json.NewEncoder(w).Encode(dataStore)
	saveDataStore()
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
	saveDataStore()
}

func loadData() DataStore {
	testikentta := formField{Name:"asd", Value: "asd", FieldType: "character"}
	kentat := []formField{testikentta}
	payload := DataStore{
		FormData{Payload: kentat, FormType: "testi", ID: "0"},
		FormData{Payload: kentat, FormType: "testi", ID: "1"},
	}

	return payload
}

func saveDataStore() {
	file, _ := json.MarshalIndent(dataStore, "", " ")
	_ = ioutil.WriteFile("datastore.json", file, 0644)
}

func handleRequests() {
	var port string = ":3001"
	router := mux.NewRouter()

	router.HandleFunc("/api", getAllForms).Methods("GET")
	router.HandleFunc("/api", addForm).Methods("POST")
	router.HandleFunc("/api", addForm).Methods("PUT")
	router.HandleFunc("/api", handleRemove).Methods("DELETE")

	router.HandleFunc("/users", getAllForms).Methods("GET") //TODO: korjaa
	router.HandleFunc("/users", addForm).Methods("POST")
	router.HandleFunc("/users", addForm).Methods("PUT")
	router.HandleFunc("/users", handleRemove).Methods("DELETE")


	router.HandleFunc("/", homePage) //catch all

	fmt.Println("Server started", port)
	log.Fatal(http.ListenAndServe(port, router))
}

func main() {
	fmt.Println("Starting server")
	dataStore = loadData()

	handleRequests()
}
