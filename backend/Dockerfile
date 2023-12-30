FROM golang:1.21-bookworm as builder
WORKDIR /app
COPY go.* ./
RUN go mod download
COPY . ./
RUN go build -v -o server ./api

FROM debian:bookworm-slim
RUN set -x && apt-get update && DEBIAN_FRONTEND=noninteractive apt-get install -y \
    ca-certificates && \
    rm -rf /var/lib/apt/lists/*
ARG RELEASE_STAGE
ENV RELEASE_STAGE=${RELEASE_STAGE}
COPY --from=builder /app/server /app/server
COPY --from=builder /app/.env.${RELEASE_STAGE} /app/.env.${RELEASE_STAGE}
CMD ["/app/server"]
