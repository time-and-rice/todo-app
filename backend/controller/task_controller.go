package controller

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/samber/lo"
)

type TaskController struct{}

func NewTaskController(e *echo.Echo) {
	tc := TaskController{}
	e.GET("/tasks", tc.GetTasks)
}

func (tc *TaskController) GetTasks(c echo.Context) error {
	tasksResponse := lo.Times(5, func(i int) TaskResponse {
		return TaskResponse{Id: i}
	})
	return c.JSON(http.StatusOK, tasksResponse)
}
