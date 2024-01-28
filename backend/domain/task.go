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
	Id        string
	Title     string
	Status    TaskStatus
	CreatedAt time.Time
	UpdatedAt time.Time
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
