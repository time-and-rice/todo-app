package infra

import (
	"context"

	firebase "firebase.google.com/go/v4"
	"firebase.google.com/go/v4/auth"
)

type Fir struct {
	AuthClient *auth.Client
}

func NewFir() *Fir {
	ctx := context.Background()

	app, err := firebase.NewApp(ctx, nil)
	if err != nil {
		panic(err)
	}

	ac, err := app.Auth(ctx)
	if err != nil {
		panic(err)
	}

	fir := &Fir{ac}
	return fir
}
