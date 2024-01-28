package handler

import (
	"log"
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
		log.Fatal(err)
		return c.JSON(http.StatusInternalServerError, err)
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
		return c.JSON(http.StatusBadRequest, err)
	}

	task := task.NewTask(authUser.Id, body.Title)
	err = th.taskRepository.Save(task)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return nil
}

func (th *TasksHandler) DeleteTask(c echo.Context) error {
	authUser := middleware.GetAuthUser(c)

	taskId := c.Param("taskId")

	task, err := th.taskRepository.FindById(taskId)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}
	if task == nil {
		return c.JSON(http.StatusNotFound, nil)
	}

	if task.AuthUserId != authUser.Id {
		return c.JSON(http.StatusForbidden, nil)
	}

	err = th.taskRepository.Delete(task)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err)
	}

	return nil
}
