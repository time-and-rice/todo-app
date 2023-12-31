package main

import (
	"github.com/jmoiron/sqlx"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	_ "github.com/lib/pq"
	"github.com/time-and-rice/todo-app/backend/controller"
)

func main() {
	_, err := sqlx.Connect("postgres", cfg.DatabaseUrl)
	if err != nil {
		panic(err)
	}

	e := echo.New()
	e.Pre(middleware.RemoveTrailingSlash())
	controller.NewTaskController(e)
	e.Start(":" + cfg.Port)
}
