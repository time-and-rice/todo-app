package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	_ "github.com/lib/pq"

	"github.com/time-and-rice/todo-app/backend/config"
	"github.com/time-and-rice/todo-app/backend/handler"
	"github.com/time-and-rice/todo-app/backend/lib"
	"github.com/time-and-rice/todo-app/backend/model/task"
)

func main() {
	e := echo.New()

	e.Pre(middleware.RemoveTrailingSlash())
	e.Use(middleware.CORS())
	e.Use(middleware.Logger())

	appEnv := config.NewAppEnv()

	db := config.NewDb(appEnv.DatabaseUrl)
	fir := config.NewFir()

	authenticator := lib.NewFirAuthenticator(fir)

	taskRepository := task.NewTaskRepositoryImpl(db)
	taskQueryService := task.NewTaskQueryServiceImpl(db)

	tasksHandler := handler.NewTasksHandler(taskRepository, taskQueryService)

	handler.Register(e, authenticator, *tasksHandler)

	e.Logger.Fatal(e.Start(":" + appEnv.Port))
}
