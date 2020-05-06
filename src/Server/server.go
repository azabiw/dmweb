package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
)

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

	payload := DataStore{
		FormData{Payload: "testi", FormType: "testi"},
		FormData{Payload: "toinen tesit", FormType: "testi"},
	}
	json.NewEncoder(w).Encode(payload)
	fmt.Println("Endpoint Hit: homePage")
}

func save() {

}

func handleRequests() {
	var port string = ":10000"
	http.HandleFunc("/", homePage)
	log.Fatal(http.ListenAndServe(port, nil))
}

func main() {
	fmt.Println("Starting server")
	handleRequests()
}
