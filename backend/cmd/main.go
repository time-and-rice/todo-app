package main

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	_ "github.com/lib/pq"

	"github.com/time-and-rice/todo-app/backend/infra"
	"github.com/time-and-rice/todo-app/backend/presen"
)

func main() {
	e := echo.New()
	e.Pre(middleware.RemoveTrailingSlash())
	e.Use(middleware.CORS())

	cfg := infra.NewCfg()

	db := infra.NewDb(cfg.DatabaseUrl)
	_ = infra.NewPqTaskRepository(db)

	fir := infra.NewFir()
	fa := infra.NewFirAuthenticator(fir)

	am := presen.NewAuthMiddleware(fa)
	_ = presen.NewMustAuthMiddleware(fa)

	root := e.Group("/")
	root.Use(am)
	root.GET("", presen.GetIndex)

	e.Start(":" + cfg.Port)
}
