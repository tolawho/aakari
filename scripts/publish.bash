#!/usr/bin/bash
rm -rf ./public && buster setup --gh-repo=git@github.com:vasanthdeveloper/aakari.git --dir=public/ && \
cd ./public && rm -rf ./README.md && buster generate --domain='http://localhost:2368' --dir=. || git add --all && git commit -m "Created static previews" && git push -u origin gh-pages --force