package app

import (
	"time"

	"github.com/time-and-rice/todo-app/backend/domain"
)

type TaskDto struct {
	Id        string            `json:"id"`
	Title     string            `json:"title"`
	Status    domain.TaskStatus `json:"status"`
	CreatedAt time.Time         `json:"createdAt"`
	UpdatedAt time.Time         `json:"updatedAt"`
}

type TaskQueryService interface {
	GetTasks() ([]TaskDto, error)
}
