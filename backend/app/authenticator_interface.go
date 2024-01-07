package app

type AuthUser struct {
	Id string
}

type Authenticator interface {
	VerifyIDToken(token string) (*AuthUser, error)
}
