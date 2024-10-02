#!/bin/bash

if [ -f .env ]; then
  export $(cat .env | xargs)
fi

VERSION=${1:-latest}

export VERSION

envsubst < k8s/secrets/secrets.yaml | kubectl apply -f -

envsubst < k8s/application/nextjs-deploy.yaml | kubectl apply -f -

kubectl apply -f k8s/application/nextjs-service.yaml

kubectl wait --for=condition=complete --timeout=300s service/nextjs-service

echo "Deployment of version ${VERSION} completed!"

echo "You can access the Admin page at the following URL:"
minikube service nextjs-service --url