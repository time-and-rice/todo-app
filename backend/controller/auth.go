package controller

import (
	"context"
	"errors"
	"strings"

	"firebase.google.com/go/v4"
	"firebase.google.com/go/v4/auth"
	"github.com/labstack/echo/v4"
)

var authClient *auth.Client

func init() {
	ctx := context.Background()

	app, err := firebase.NewApp(ctx, nil)
	if err != nil {
		panic(err)
	}

	authClient, err = app.Auth(ctx)
	if err != nil {
		panic(err)
	}
}

func decodeIdToken(c echo.Context) (*auth.Token, error) {
	authorization := c.Request().Header.Get("Authorization")
	if authorization == "" {
		return nil, errors.New("authorization header is required")
	}
	if strings.HasPrefix(authorization, "Bearer ") {
		return nil, errors.New("invalid authorization header format")
	}

	token := strings.Split(authorization, "Bearer ")[1]

	decoded, err := authClient.VerifyIDToken(context.Background(), token)
	if err != nil {
		return nil, err
	}

	return decoded, nil
}
