package config

import (
	"os"

	"github.com/caarlos0/env/v10"
	"github.com/joho/godotenv"
)

type AppEnv struct {
	ReleaseStage string `env:"RELEASE_STAGE,notEmpty"`
	Port         string `env:"PORT" envDefault:"8080"`
	DatabaseUrl  string `env:"DATABASE_URL,notEmpty"`
}

func NewAppEnv() AppEnv {
	config := os.Getenv("CONFIG")
	err := godotenv.Load(config)
	if err != nil {
		panic(err)
	}
	var appEnv AppEnv
	env.Parse(&appEnv)
	return appEnv
}
