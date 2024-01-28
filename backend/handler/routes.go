package handler

import (
	"github.com/labstack/echo/v4"
	"github.com/time-and-rice/todo-app/backend/handler/middleware"
	"github.com/time-and-rice/todo-app/backend/lib"
)

func Register(e *echo.Echo, authenticator lib.Authenticator, tasksHandler TasksHandler) {
	mustAuth := middleware.NewMustAuthMiddleware(authenticator)

	me := e.Group("/me")
	me.Use(mustAuth)

	// /me/tasks
	tasks := me.Group("/tasks")
	tasks.GET("", tasksHandler.GetTasks)
}
