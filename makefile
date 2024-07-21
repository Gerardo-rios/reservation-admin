.PHONY: build run up down test test-all one-test

COMPOSE_FILE = docker-compose.yml

build:
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
