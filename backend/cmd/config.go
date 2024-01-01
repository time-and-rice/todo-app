package main

import (
	"os"

	"github.com/caarlos0/env/v10"
	"github.com/joho/godotenv"
)

type Config struct {
	ReleaseStage string `env:"RELEASE_STAGE,notEmpty"`
	Port         string `env:"PORT" envDefault:"8080"`
	DatabaseUrl  string `env:"DATABASE_URL,notEmpty"`
}

var cfg Config

func init() {
	config := os.Getenv("CONFIG")
	err := godotenv.Load(config)
	if err != nil {
		panic(err)
	}
	env.Parse(&cfg)
}
