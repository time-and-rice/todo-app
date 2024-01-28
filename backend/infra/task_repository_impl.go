package infra

import (
	"time"

	"github.com/jmoiron/sqlx"
	"github.com/time-and-rice/todo-app/backend/domain"
)

type PqTask struct {
	Id        string            `db:"id"`
	Title     string            `db:"title"`
	Status    domain.TaskStatus `db:"status"`
	CreatedAt time.Time         `db:"created_at"`
	UpdatedAt time.Time         `db:"updated_at"`
}

func into(pt *PqTask) *domain.Task {
	return &domain.Task{
		Id:        pt.Id,
		Title:     pt.Title,
		Status:    pt.Status,
		CreatedAt: pt.CreatedAt,
		UpdatedAt: pt.UpdatedAt,
	}
}

func from(t *domain.Task) *PqTask {
	return &PqTask{
		Id:        t.Id,
		Title:     t.Title,
		Status:    t.Status,
		CreatedAt: t.CreatedAt,
		UpdatedAt: t.UpdatedAt,
	}
}

type PqTaskRepository struct {
	db *sqlx.DB
}

func NewPqTaskRepository(db *sqlx.DB) domain.TaskRepository {
	return &PqTaskRepository{db}
}

func (r *PqTaskRepository) FindById(id string) (*domain.Task, error) {
	var pqTask PqTask
	err := r.db.Get(&pqTask, "SELECT * FROM tasks WHERE id =$1", id)
	if err != nil {
		return nil, err
	}
	return into(&pqTask), nil
}

func (r *PqTaskRepository) Save(task *domain.Task) error {
	pqTask := from(task)
	_, err := r.db.NamedExec(`
		INSERT INTO tasks (id, title, status, created_at, updated_at)
		VALUES (:id, :title, :status, :created_at, :updated_at)
		ON CONFLICT (id) DO UPDATE
		SET title = :title, status = :status, created_at = :created_at, updated_at = :updated_at
	`, pqTask)
	return err
}

func (r *PqTaskRepository) Delete(task *domain.Task) error {
	_, err := r.db.Exec("DELETE FROM tasks WHERE id = $1", task.Id)
	return err
}
