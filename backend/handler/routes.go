package handler

import (
	"github.com/labstack/echo/v4"
	"github.com/time-and-rice/todo-app/backend/handler/middleware"
	"github.com/time-and-rice/todo-app/backend/lib"
)

func Register(e *echo.Echo, authenticator lib.Authenticator, tasksHandler *TasksHandler, rootHandler *RootHandler) {
	mustAuth := middleware.NewMustAuthMiddleware(authenticator)

	e.GET("", rootHandler.GetHome)

	me := e.Group("/me")
	me.Use(mustAuth)

	tasks := me.Group("/tasks")
	tasks.GET("", tasksHandler.GetTasks)
	tasks.POST("", tasksHandler.CreateTask)
	tasks.DELETE("/:taskId", tasksHandler.DeleteTask)
}
