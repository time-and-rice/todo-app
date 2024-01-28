package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/time-and-rice/todo-app/backend/model/task"
)

type TasksHandler struct {
	taskRepository   task.TaskRepository
	taskQueryService task.TaskQueryService
}

func NewTasksHandler(tr task.TaskRepository, tqs task.TaskQueryService) *TasksHandler {
	return &TasksHandler{
		tr,
		tqs,
	}
}

func (th *TasksHandler) GetTasks(c echo.Context) error {
	tasks, err := th.taskQueryService.GetTasks()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}
	return c.JSON(http.StatusOK, tasks)
}
