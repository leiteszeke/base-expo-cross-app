#!/bin/bash

if [ "$1" != "qa" ] && [ "$1" != "production" ]; then
  echo "Usage: $0 qa|production"
  exit 1
fi

rm .vercel/project.json
rm .env

# Copy the appropriate JSON file to .vercel folder
if [ "$1" == "qa" ]; then
  cp .env.qa .env
  cp .vercel/qa/project.json .vercel
else
  cp .env.production .env
  cp .vercel/production/project.json .vercel
fi

yarn release