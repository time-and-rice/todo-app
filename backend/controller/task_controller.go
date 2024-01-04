package controller

import (
	"log"
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/time-and-rice/todo-app/backend/model"
)

func SetupTaskRoutes(e *echo.Echo) {
	e.GET("/tasks", GetTasks)
}

func GetTasks(c echo.Context) error {
	token, err := decodeIdToken(c)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, err.Error())
	}

	tasks, err := model.GetTasks()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	log.Println(token)
	return c.JSONPretty(http.StatusOK, tasks, "  ")
}
