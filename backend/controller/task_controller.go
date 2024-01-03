package controller

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/time-and-rice/todo-app/backend/model"
)

type TaskController struct {
	tr model.TaskRepository
}

func NewTaskController(e *echo.Echo, tr model.TaskRepository) {
	tc := TaskController{tr}
	e.GET("/tasks", tc.GetTasks)
}

func (tc *TaskController) GetTasks(c echo.Context) error {
	tasks := tc.tr.GetTasks()
	return c.JSONPretty(http.StatusOK, tasks, "  ")
}
