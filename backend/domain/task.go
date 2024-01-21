package domain

import (
	"time"
)

type TaskStatus string

const (
	TaskStatusIncomplete TaskStatus = "Incomplete"
	TaskStatusComplete   TaskStatus = "Complete"
)

type Task struct {
	Id        string     `db:"id" json:"id"`
	Title     string     `db:"title" json:"name"`
	Status    TaskStatus `db:"status" json:"status"`
	CreatedAt time.Time  `db:"created_at" json:"createdAt"`
	UpdatedAt time.Time  `db:"updated_at" json:"updatedAt"`
}

func NewTask(title string) *Task {
	id := GenId()
	now := GenNow()

	return &Task{
		Id:        id,
		Title:     title,
		Status:    TaskStatusIncomplete,
		CreatedAt: now,
		UpdatedAt: now,
	}
}

type TaskRepository interface {
	FindById(id string) (*Task, error)
	Save(task *Task) error
	Delete(task *Task) error
}
