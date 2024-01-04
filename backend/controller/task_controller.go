package controller

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/time-and-rice/todo-app/backend/model"
)

func setupTaskRoutes(e *echo.Echo) {
	e.GET("/tasks", getTasks)
}

func getTasks(c echo.Context) error {
	tasks, err := model.GetTasks()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return c.JSONPretty(http.StatusOK, tasks, "  ")
}
