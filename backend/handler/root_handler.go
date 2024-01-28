package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type RootHandler struct{}

func NewRootHandler() *RootHandler {
	return &RootHandler{}
}

func (rh *RootHandler) GetHome(c echo.Context) error {
	return c.JSON(http.StatusOK, "I'm fine.")
}
