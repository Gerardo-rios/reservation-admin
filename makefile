.PHONY: build run up down

build:
	docker build -t cancha-admin .

run:
	docker run -p 3000:3000 cancha-admin

up:
	docker-compose up --build

down:
	docker-compose down
