.PHONY: build run up down test test-all one-test

COMPOSE_FILE = docker-compose.yml
DOCKER_REPO := ${DOCKER_REPO}
VERSION ?= latest

build:
	npm run lint:fix
	docker compose -f $(COMPOSE_FILE) build

up:
	docker compose -f $(COMPOSE_FILE) up -d

down:
	docker compose -f $(COMPOSE_FILE) down

logs:
	docker compose -f $(COMPOSE_FILE) logs -f

shell:
	docker compose -f $(COMPOSE_FILE) exec app /bin/bash

test:
	docker compose -f $(COMPOSE_FILE) run --rm app npm run test

clean:
	docker compose -f $(COMPOSE_FILE) down -v --rmi all

restart: down build up

docker-push:
	@echo "Pushing docker images..."
	docker build -t $(DOCKER_REPO):$(VERSION) .
	docker push $(DOCKER_REPO):$(VERSION)

local-deploy:
	@echo "Deploying to local environment with version $(VERSION)..."
	./local_deploy.sh $(VERSION)