
# reservation-admin
Frontend Admin for reservation app that is part for ioet university 2.0

This project is a court administration application developed with Next.js 14.

## Prerequisites

- Docker
- Docker Compose
- Make (optional, but recommended)

## Project Setup

1. Clone this repository:

```bash
git clone git@github.com:Gerardo-rios/reservation-admin.git
cd reservation-admin
```

2. Copy the environment variable file:

```bash
cp .env.example .env
```

Edit the `.env` file with your specific configurations.

## Running the Project

This project uses Docker and Docker Compose for execution. You can use the following Make commands to manage the project:

### Build Docker image

```bash
make build
```

### Start the application
    
```bash
make up
```

### Stop the application

```bash
make down
```

### Run all tests

```bash
make test
```

