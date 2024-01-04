package controller

import (
	"context"
	"strings"

	"firebase.google.com/go"
	"firebase.google.com/go/auth"
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
		return nil, nil
	}
	if strings.HasPrefix(authorization, "Bearer ") {
		return nil, nil
	}

	token := strings.TrimPrefix(authorization, "Bearer ")

	decoded, err := authClient.VerifyIDToken(context.Background(), token)
	if err != nil {
		return nil, err
	}

	return decoded, nil
}
