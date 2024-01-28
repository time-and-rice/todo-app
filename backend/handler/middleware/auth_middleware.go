package middleware

import (
	"errors"
	"net/http"
	"strings"

	"github.com/labstack/echo/v4"
	"github.com/time-and-rice/todo-app/backend/lib"
)

func NewAuthMiddleware(a lib.Authenticator) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			au, _ := decodeJwt(a, c)
			c.Set("authUser", au)
			return next(c)
		}
	}
}

func NewMustAuthMiddleware(a lib.Authenticator) echo.MiddlewareFunc {
	return func(next echo.HandlerFunc) echo.HandlerFunc {
		return func(c echo.Context) error {
			au, err := decodeJwt(a, c)
			if err != nil {
				return c.JSON(http.StatusUnauthorized, err)
			}
			c.Set("authUser", au)
			return next(c)
		}
	}
}

func decodeJwt(a lib.Authenticator, c echo.Context) (*lib.AuthUser, error) {
	token := c.Request().Header.Get("Authorization")
	if token == "" {
		return nil, errors.New("authorization header is required")
	}
	if !strings.HasPrefix(token, "Bearer ") {
		return nil, errors.New("invalid authorization header format")
	}

	token = strings.TrimPrefix(token, "Bearer ")

	au, err := a.VerifyIdToken(token)
	if err != nil {
		return nil, err
	}

	return au, nil
}

func GetAuthUser(c echo.Context) *lib.AuthUser {
	au, ok := c.Get("authUser").(*lib.AuthUser)
	if !ok {
		return nil
	}
	return au
}
