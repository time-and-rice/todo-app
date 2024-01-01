package model

import (
	"github.com/jmoiron/sqlx"
)

type pqTaskRepository struct {
	DB *sqlx.DB
}

func NewPqTaskRepository(db *sqlx.DB) TaskRepository {
	return &pqTaskRepository{DB: db}
}

func (tr *pqTaskRepository) GetTasks() []Task {
	tasks := []Task{}
	_ = tr.DB.Select(&tasks, `SELECT * FROM tasks;`)
	return tasks
}
