package model

import "time"

type Task struct {
	Id        int       `db:"id"`
	Name      string    `db:"name"`
	Status    string    `db:"status"`
	CreatedAt time.Time `db:"created_at"`
	UpdatedAt time.Time `db:"updated_at"`
}

type TaskRepository interface {
	GetTasks() []Task
}
