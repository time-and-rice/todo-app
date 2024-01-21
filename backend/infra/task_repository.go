package infra

import (
	"github.com/jmoiron/sqlx"
	"github.com/time-and-rice/todo-app/backend/domain"
)

type PqTaskRepository struct {
	db *sqlx.DB
}

func NewPqTaskRepository(db *sqlx.DB) domain.TaskRepository {
	return &PqTaskRepository{db}
}

func (r *PqTaskRepository) FindById(id string) (*domain.Task, error) {
	var task domain.Task
	err := r.db.Get(&task, "SELECT * FROM tasks WHERE id =$1", id)
	if err != nil {
		return nil, err
	}
	return &task, nil
}

func (r *PqTaskRepository) Save(task *domain.Task) error {
	_, err := r.db.NamedExec(`
		INSERT INTO tasks (id, title, status, created_at, updated_at)
		VALUES (:id, :title, :status, :created_at, :updated_at)
		ON CONFLICT (id) DO UPDATE
		SET title = :title, status = :status, created_at = :created_at, updated_at = :updated_at
	`, task)
	return err
}

func (r *PqTaskRepository) Delete(task *domain.Task) error {
	_, err := r.db.Exec("DELETE FROM tasks WHERE id = $1", task.Id)
	return err
}
