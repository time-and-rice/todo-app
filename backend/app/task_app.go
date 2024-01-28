package app

import "github.com/time-and-rice/todo-app/backend/domain"

type TaskApp struct {
	taskRepository   domain.TaskRepository
	taskQueryService TaskQueryService
}

func NewTaskApp(tr domain.TaskRepository, tqs TaskQueryService) *TaskApp {
	return &TaskApp{
		tr,
		tqs,
	}
}

func (ta *TaskApp) CreateTask() error {
	task := domain.NewTask("new task")
	err := ta.taskRepository.Save(task)
	return err
}
