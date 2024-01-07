package app

type AuthUser struct {
	Id string `json:"id"`
}

type Authenticator interface {
	VerifyIdToken(token string) (*AuthUser, error)
}
