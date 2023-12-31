package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	dbHost := cfg.DatabaseUrl
	port := cfg.Port

	log.Printf("dbHost: %s", dbHost)
	log.Printf("port: %s", port)

	http.HandleFunc("/", home)

	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		panic(err)
	}
}

func home(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hi!")
}
