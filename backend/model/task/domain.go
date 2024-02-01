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
	Id         string     `db:"id" validate:"required"`
	Title      string     `db:"title" validate:"required"`
	Status     TaskStatus `db:"status"`
	CreatedAt  time.Time  `db:"created_at"`
	UpdatedAt  time.Time  `db:"updated_at"`
	AuthUserId string     `db:"auth_user_id" validate:"required"`
}

type TaskRepository interface {
	FindById(id string) (*Task, error)
	Save(task *Task) error
	Delete(task *Task) error
}

func NewTask(authUserId string, title string) *Task {
	id := lib.GenId()
	now := lib.GenNow()

	return &Task{
		Id:         id,
		Title:      title,
		Status:     TaskStatusIncomplete,
		CreatedAt:  now,
		UpdatedAt:  now,
		AuthUserId: authUserId,
	}
}

func (t *Task) ToggleComplete() {
	switch t.Status {
	case TaskStatusIncomplete:
		t.Status = TaskStatusComplete
	case TaskStatusComplete:
		t.Status = TaskStatusIncomplete
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
	GetTasks(authUserId string) ([]TaskDto, error)
}
