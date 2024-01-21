# TODO

- [] firebase
  - [] auth
  - [] emu

# NOTE

- gcp へ deploy
  - (gcloud artifacts repositories create repo-0 --repository-format=docker --location=asia-northeast1)
  - (gcloud auth configure-docker asia-northeast1-docker.pkg.dev)
  - docker build . --tag asia-northeast1-docker.pkg.dev/todo-app-407716/repo-0/img-0:latest --platform linux/amd64
  - docker push asia-northeast1-docker.pkg.dev/todo-app-407716/repo-0/img-0:latest
  - gcloud run deploy server --image asia-northeast1-docker.pkg.dev/todo-app-407716/repo-0/img-0:latest --region asia-northeast1 --allow-unauthenticated
  - gcloud artifacts docker images delete asia-northeast1-docker.pkg.dev/todo-app-407716/repo-0/img-0 --quiet
- golang-migrate で migrate
  - go install -tags 'postgres' github.com/golang-migrate/migrate/v4/cmd/migrate@latest
  - migrate create -ext sql -dir migrations -seq create_tasks
  - migrate -database "postgresql://postgres:password@localhost:5432/todo-app?sslmode=disable" -path ./migrations up
  - psql -U postgres -d todo-app
    - \dt: テーブル一覧
    - \d tasks: カラム定義
    - \dT+: カスタムタイプ一覧
