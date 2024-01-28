package task

import "github.com/jmoiron/sqlx"

type TaskRepositoryImpl struct {
	db *sqlx.DB
}

func NewTaskRepositoryImpl(db *sqlx.DB) TaskRepository {
	return &TaskRepositoryImpl{db}
}

func (r *TaskRepositoryImpl) FindById(id string) (*Task, error) {
	var task Task
	err := r.db.Get(&task, "SELECT * FROM tasks WHERE id =$1", id)
	if err != nil {
		return nil, err
	}
	return &task, nil
}

func (r *TaskRepositoryImpl) Save(task *Task) error {
	_, err := r.db.NamedExec(`
		INSERT INTO tasks (id, title, status, created_at, updated_at)
		VALUES (:id, :title, :status, :created_at, :updated_at)
		ON CONFLICT (id) DO UPDATE
		SET title = :title, status = :status, created_at = :created_at, updated_at = :updated_at
	`, task)
	return err
}

func (r *TaskRepositoryImpl) Delete(task *Task) error {
	_, err := r.db.Exec("DELETE FROM tasks WHERE id = $1", task.Id)
	return err
}
