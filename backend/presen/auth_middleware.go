package presen

import (
	"errors"
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
	"github.com/time-and-rice/todo-app/backend/app"
)

func NewAuthMiddleware(a app.Authenticator) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			au, err := decodeJwt(a, c)
			if err != nil {
				return nil
			}
			c.Set("authUser", au)
			return nil
		}
	}
}

func NewMustAuthMiddleware(a app.Authenticator) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			au, err := decodeJwt(a, c)
			if err != nil {
				return c.JSON(http.StatusUnauthorized, err)
			}
			c.Set("authUser", au)
			return nil
		}
	}
}

func decodeJwt(a app.Authenticator, c echo.Context) (*app.AuthUser, error) {
	token := c.Request().Header.Get("Authorization")
	if token == "" {
		return nil, errors.New("authorization header is required")
	}
	if !strings.HasPrefix(token, "Bearer ") {
		return nil, errors.New("invalid authorization header format")
	}

	token = strings.TrimPrefix(token, "Bearer ")

	au, err := a.VerifyIDToken(token)
	if err != nil {
		return nil, err
	}

	return au, nil
}

func GetAuthUser(c echo.Context) *app.AuthUser {
	au, ok := c.Get("authUser").(*app.AuthUser)
	if !ok {
		return nil
	}
	return au
}
