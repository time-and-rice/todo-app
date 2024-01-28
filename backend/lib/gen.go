package lib

import (
	"crypto/rand"
	"io"
	"time"

	"github.com/oklog/ulid"
)

var (
	entropy io.Reader
)

func init() {
	entropy = ulid.Monotonic(rand.Reader, 0)
}

func GenNow() time.Time {
	return time.Now()
}

func GenId() string {
	ms := ulid.Timestamp(time.Now())
	return ulid.MustNew(ms, entropy).String()
}
