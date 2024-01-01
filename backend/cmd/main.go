package main

import (
	"github.com/jmoiron/sqlx"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	_ "github.com/lib/pq"
	"github.com/time-and-rice/todo-app/backend/controller"
	"github.com/time-and-rice/todo-app/backend/model"
)

func main() {
	db, err := sqlx.Connect("postgres", cfg.DatabaseUrl)
	if err != nil {
		panic(err)
	}
	defer db.Close()

	e := echo.New()
	e.Pre(middleware.RemoveTrailingSlash())

	tr := model.NewPqTaskRepository(db)
	controller.NewTaskController(e, tr)

	e.Start(":" + cfg.Port)
}
