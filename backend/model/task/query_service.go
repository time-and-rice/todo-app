package task

import "github.com/jmoiron/sqlx"

type TaskQueryServiceImpl struct {
	db *sqlx.DB
}

func NewTaskQueryServiceImpl(db *sqlx.DB) TaskQueryService {
	return &TaskQueryServiceImpl{db}
}

func (tqs *TaskQueryServiceImpl) GetTasks(authUserId string) ([]TaskDto, error) {
	tasksDto := make([]TaskDto, 0)
	err := tqs.db.Select(&tasksDto, `
		SELECT id, title, status, created_at, updated_at
		FROM tasks
		WHERE auth_user_id = $1
		ORDER BY created_at ASC
	`, authUserId)
	if err != nil {
		return nil, err
	}
	return tasksDto, nil
}
