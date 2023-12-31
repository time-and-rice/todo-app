package controller

type TaskResponse struct {
	Id int `json:"id"`
}

type TasksResponse struct {
	Tasks []TaskResponse `json:"tasks"`
}
