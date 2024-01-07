package presen

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func HealthCheckHandler(c echo.Context) error {
	au := GetAuthUser(c)
	return c.JSON(http.StatusOK, au)
}
