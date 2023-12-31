package model

import "time"

type Task struct {
	Id        int
	Name      string
	Status    string
	CreatedAt time.Time
	UpdatedAt time.Time
}
