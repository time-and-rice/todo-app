package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/time-and-rice/todo-app/backend/common"
	"github.com/time-and-rice/todo-app/backend/controller"
)

func main() {
	e := echo.New()
	e.Pre(middleware.RemoveTrailingSlash())

	controller.Setup(e)

	e.Start(":" + common.Cfg.Port)
}
