#!/usr/bin/env bash

# Stop the container if running
docker stop aakari 2>>/dev/null && sleep 3

# Create a new Docker container using Ghost's image
docker run --rm -d \
    -p 2368:2368 \
    --name aakari \
    -e NODE_ENV=development \
    -v "$(pwd):/var/lib/ghost/content/themes/aakari" \
    -v "$(pwd)/database/images:/var/lib/ghost/content/images" \
    -v "$(pwd)/database/ghost.db:/var/lib/ghost/content/data/ghost.db" \
    ghost:latest
