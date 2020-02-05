#!/bin/bash

export DOCKER_IMAGE_AND_TAG=${1}

npm ci
npm run build:production
npm run lint
npm prune --production
make docker/build