package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
	"github.com/time-and-rice/todo-app/backend/handler/middleware"
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
	authUser := middleware.GetAuthUser(c)
	tasks, err := th.taskQueryService.GetTasks(authUser.Id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, tasks)
}

type CreateTaskBody struct {
	Title string `json:"title"`
}

func (th *TasksHandler) CreateTask(c echo.Context) error {
	authUser := middleware.GetAuthUser(c)

	body := new(CreateTaskBody)
	err := c.Bind(body)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	task := task.NewTask(authUser.Id, body.Title)
	err = c.Validate(task)
	if err != nil {
		return c.JSON(http.StatusUnprocessableEntity, err.Error())
	}

	err = th.taskRepository.Save(task)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return nil
}

func (th *TasksHandler) DeleteTask(c echo.Context) error {
	authUser := middleware.GetAuthUser(c)

	taskId := c.Param("taskId")

	task, err := th.taskRepository.FindById(taskId)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	if task == nil {
		return c.JSON(http.StatusNotFound, nil)
	}

	if task.AuthUserId != authUser.Id {
		return c.JSON(http.StatusForbidden, nil)
	}

	err = th.taskRepository.Delete(task)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}

	return nil
}
