package main

import (
	"log"
	"net/http"

	"github.com/time-and-rice/todo-app/backend/controller"
)

func main() {
	tc := controller.NewTasksController()
	ro := controller.NewRouter(tc)

	server := http.Server{
		Addr: ":" + cfg.Port,
	}
	http.HandleFunc("/tasks/", ro.HandleTasksRequest)
	log.Printf("serve on %s", cfg.Port)
	server.ListenAndServe()
}
