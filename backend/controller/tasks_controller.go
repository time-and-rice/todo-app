package controller

import (
	"encoding/json"
	"net/http"
)

type TaskResponse struct {
	Id int `json:"id"`
}

type TasksResponse struct {
	Tasks []TaskResponse `json:"tasks"`
}

type TasksController interface {
	GetTasks(w http.ResponseWriter, r *http.Request)
}

type tasksController struct{}

func NewTasksController() TasksController {
	return &tasksController{}
}

func (tc *tasksController) GetTasks(w http.ResponseWriter, r *http.Request) {
	tasksResponse := []TaskResponse{{Id: 1}, {Id: 2}, {Id: 3}}
	output, _ := json.MarshalIndent(tasksResponse, "", "  ")
	w.Header().Set("Content-Type", "application/json")
	w.Write(output)
}
