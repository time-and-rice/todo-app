package controller

import "net/http"

type Router interface {
	HandleTasksRequest(w http.ResponseWriter, r *http.Request)
}

type router struct {
	tc TasksController
}

func NewRouter(tc TasksController) Router {
	return &router{tc}
}

func (ro *router) HandleTasksRequest(w http.ResponseWriter, r *http.Request) {
	switch r.Method {
	case "GET":
		ro.tc.GetTasks(w, r)
	default:
		w.WriteHeader(405)
	}
}
