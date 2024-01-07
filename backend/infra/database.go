package infra

import "github.com/jmoiron/sqlx"

func NewDb(dsn string) *sqlx.DB {
	db, err := sqlx.Connect("postgres", dsn)
	if err != nil {
		panic(err)
	}
	return db
}
