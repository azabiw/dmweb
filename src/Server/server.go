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
	Name string `json:"name"`
	Label string `json:"label"`
	Fields  []formField `json:"fields"`
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
	saveDataStore()
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
	saveDataStore()
}

//Lähettää asiakkaalle koko dataStoren sisällön
func getAllForms(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	fmt.Println("Request")
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
	fmt.Println(form)
	json.NewEncoder(w).Encode(form) //lähetetään vastauksena sama lomake
	saveDataStore()
}

func loadData() DataStore {
	filename := "datastore.json"
	println("Loading data from: ", filename)
	/*testikentta := formField{Name:"asd", Value: "asd", FieldType: "character"}
	kentat := []formField{testikentta}
	payload := DataStore{
		FormData{Payload: kentat, FormType: "testi", ID: "0"},
		FormData{Payload: kentat, FormType: "testi", ID: "1"},
	}*/

	file, err := ioutil.ReadFile(filename)
	if err != nil {
		log.Fatal(err)
	}

	payload := DataStore{}
 
	_ = json.Unmarshal([]byte(file), &payload)

	println("Load complete")

	return payload
}

func saveDataStore() {
	file, _ := json.MarshalIndent(dataStore, "", " ")
	_ = ioutil.WriteFile("datastore.json", file, 0644)
}

func getSingleForm (w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	key := vars["id"]
	for _, form := range dataStore {
		if form.ID == key {
			json.NewEncoder(w).Encode(form)
			fmt.Println("Form found with", key)

			return
		} else {
			fmt.Println("Form not found with id", key)
			
		}
	}
}

func handleRequests() {
	var port string = ":3001"
	router := mux.NewRouter()

	router.HandleFunc("/api", getAllForms).Methods("GET")
	router.HandleFunc("/api/{id}", getSingleForm).Methods("GET")

	router.HandleFunc("/api", addForm).Methods("POST")
	router.HandleFunc("/api", addForm).Methods("PUT")
	router.HandleFunc("/api", handleRemove).Methods("DELETE")

	router.HandleFunc("/users", getAllForms).Methods("GET") //TODO: korjaa
	router.HandleFunc("/users/{id}", getSingleForm).Methods("GET")

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
