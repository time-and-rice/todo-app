package model

import (
	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
	"github.com/time-and-rice/todo-app/backend/config"
)

var DB *sqlx.DB

func init() {
	var err error
	DB, err = sqlx.Connect("postgres", config.Cfg.DatabaseUrl)
	if err != nil {
		panic(err)
	}
}
