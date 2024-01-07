package infra

import (
	"context"

	"firebase.google.com/go/v4/auth"
	"github.com/time-and-rice/todo-app/backend/app"
)

type FirAuthenticator struct {
	client *auth.Client
}

func NewFirAuthenticator(fir *Fir) *FirAuthenticator {
	return &FirAuthenticator{client: fir.AuthClient}
}

func VerifyIdToken(fa *FirAuthenticator, token string) (*app.AuthUser, error) {
	decoded, err := fa.client.VerifyIDToken(context.Background(), token)
	if err != nil {
		return nil, err
	}
	au := &app.AuthUser{Id: decoded.UID}
	return au, nil
}
