package model

import "time"

type Task struct {
	Id        int       `db:"id" json:"id"`
	Name      string    `db:"name" json:"name"`
	Status    string    `db:"status" json:"status"`
	CreatedAt time.Time `db:"created_at" json:"createdAt"`
	UpdatedAt time.Time `db:"updated_at" json:"updatedAt"`
}

func GetTasks() []Task {
	tasks := []Task{}
	_ = DB.Select(&tasks, `SELECT * FROM tasks;`)
	return tasks
}
