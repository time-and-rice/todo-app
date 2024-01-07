package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	_ "github.com/lib/pq"
	"github.com/time-and-rice/todo-app/backend/infra"
)

func main() {
	e := echo.New()
	e.Pre(middleware.RemoveTrailingSlash())

	cfg := infra.NewCfg()

	_ = infra.NewDb(cfg.DatabaseUrl)

	fir := infra.NewFir()
	_ = infra.NewFirAuthenticator(fir)

	e.Start(":" + cfg.Port)
}
