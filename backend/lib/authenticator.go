package lib

import (
	"context"

	"firebase.google.com/go/v4/auth"
	"github.com/time-and-rice/todo-app/backend/config"
)

// Interface
type AuthUser struct {
	Id string
}

type Authenticator interface {
	VerifyIdToken(token string) (*AuthUser, error)
}

// Impl
type AuthenticatorImpl struct {
	auth *auth.Client
}

func NewFirAuthenticator(fir *config.Fir) Authenticator {
	return &AuthenticatorImpl{fir.Auth}
}

func (fa *AuthenticatorImpl) VerifyIdToken(token string) (*AuthUser, error) {
	decoded, err := fa.auth.VerifyIDToken(context.Background(), token)
	if err != nil {
		return nil, err
	}
	au := &AuthUser{Id: decoded.UID}
	return au, nil
}
