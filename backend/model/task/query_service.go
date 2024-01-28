package task

import "github.com/jmoiron/sqlx"

type TaskQueryServiceImpl struct {
	db *sqlx.DB
}

func NewTaskQueryServiceImpl(db *sqlx.DB) TaskQueryService {
	return &TaskQueryServiceImpl{db}
}

func (tqs *TaskQueryServiceImpl) GetTasks() ([]TaskDto, error) {
	tasksDto := make([]TaskDto, 0)
	err := tqs.db.Select(&tasksDto, "SELECT * FROM tasks")
	if err != nil {
		return nil, err
	}
	return tasksDto, nil
}
