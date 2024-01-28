package task

import (
	"time"

	"github.com/time-and-rice/todo-app/backend/lib"
)

type TaskStatus string

const (
	TaskStatusIncomplete TaskStatus = "Incomplete"
	TaskStatusComplete   TaskStatus = "Complete"
)

// Command
type Task struct {
	Id        string     `db:"id"`
	Title     string     `db:"title"`
	Status    TaskStatus `db:"status"`
	CreatedAt time.Time  `db:"created_at"`
	UpdatedAt time.Time  `db:"updated_at"`
}

type TaskRepository interface {
	FindById(id string) (*Task, error)
	Save(task *Task) error
	Delete(task *Task) error
}

func NewTask(title string) *Task {
	id := lib.GenId()
	now := lib.GenNow()

	return &Task{
		Id:        id,
		Title:     title,
		Status:    TaskStatusIncomplete,
		CreatedAt: now,
		UpdatedAt: now,
	}
}

// Query
type TaskDto struct {
	Id        string     `db:"id" json:"id"`
	Title     string     `db:"title" json:"title"`
	Status    TaskStatus `db:"status" json:"status"`
	CreatedAt time.Time  `db:"created_at" json:"createdAt"`
	UpdatedAt time.Time  `db:"updated_at" json:"updatedAt"`
}

type TaskQueryService interface {
	GetTasks() ([]TaskDto, error)
}
