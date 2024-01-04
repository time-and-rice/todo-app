package controller

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/time-and-rice/todo-app/backend/model"
)

func SetupTaskRoutes(e *echo.Echo) {
	e.GET("/tasks", GetTasks)
}

func GetTasks(c echo.Context) error {
	tasks := model.GetTasks()
	return c.JSONPretty(http.StatusOK, tasks, "  ")
}
