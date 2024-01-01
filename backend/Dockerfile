FROM golang:1.21-bookworm as builder
WORKDIR /app
COPY go.* ./
RUN go mod download
COPY . ./
RUN go build -v -o server ./cmd

FROM debian:bookworm-slim
RUN set -x && apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    ca-certificates && \
    rm -rf /var/lib/apt/lists/*
ARG CONFIG
ENV CONFIG=${CONFIG}
COPY --from=builder /app/server /app/server
COPY --from=builder /app/${CONFIG} /app/${CONFIG}
WORKDIR /app
CMD ["./server"]
