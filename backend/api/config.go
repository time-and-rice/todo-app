package main

import (
	"fmt"
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
	releaseStage := os.Getenv("RELEASE_STAGE")
	envPath := fmt.Sprintf(".env.%s", releaseStage)
	err := godotenv.Load(envPath)
	if err != nil {
		panic(err)
	}
	env.Parse(&cfg)
}
