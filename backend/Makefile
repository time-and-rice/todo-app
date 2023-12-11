.PHONY: docker-build \
		docker-push \
		run-deploy \
		artifacts-clean \
		test
docker-build:
	docker build . --tag asia-northeast1-docker.pkg.dev/todo-app-407716/repo-0/img-0:latest --platform linux/amd64
docker-push:
	docker push asia-northeast1-docker.pkg.dev/todo-app-407716/repo-0/img-0:latest
run-deploy:
	gcloud run deploy server --image asia-northeast1-docker.pkg.dev/todo-app-407716/repo-0/img-0:latest --region asia-northeast1 --allow-unauthenticated
artifacts-clean:
	gcloud artifacts docker images delete asia-northeast1-docker.pkg.dev/todo-app-407716/repo-0/img-0 --quiet
test:
	go test
