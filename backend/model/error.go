package model

import "errors"

var (
	BadRequest          = errors.New("bad request")
	Unauthorized        = errors.New("unauthorized")
	Forbidden           = errors.New("forbidden")
	Conflict            = errors.New("conflict")
	UnprocessableEntity = errors.New("unprocessable entity")
	InternalServerError = errors.New("internal server error")
)
