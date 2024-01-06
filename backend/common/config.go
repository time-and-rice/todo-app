package common

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

var Cfg Config

func init() {
	config := os.Getenv("CONFIG")
	err := godotenv.Load(config)
	if err != nil {
		panic(err)
	}
	env.Parse(&Cfg)
}
