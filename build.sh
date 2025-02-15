#!/bin/bash

# Check if a commit message argument is provided
if [ -z "$1" ]; then
    echo "Error: No commit message provided."
    echo "Usage: npm run build -- \"Your commit message\""
    exit 1
fi

COMMIT_MESSAGE="$1"

# Variables
DOCKER_IMAGE_NAME="niico-mailer:latest"
DOCKER_REPO_NAME="chrisncs/niico-mailer:latest"
DOCKER_FILE_PATH="."

# Step 1: Stage all changes, commit, and push to GitHub
echo "Staging all changes..."
git add .

echo "Committing with message: $COMMIT_MESSAGE"
git commit -m "$COMMIT_MESSAGE"

echo "Pushing changes to GitHub..."
git push origin main  # Change 'main' if necessary

# Step 2: Build the Docker image
echo "Building the Docker image..."
docker build -t $DOCKER_IMAGE_NAME $DOCKER_FILE_PATH

# Step 3: Tag the image
echo "Tagging the image $DOCKER_IMAGE_NAME as $DOCKER_REPO_NAME"
docker tag $DOCKER_IMAGE_NAME $DOCKER_REPO_NAME

# Step 4: Push the image to Docker Hub
echo "Pushing the image to Docker Hub..."
docker push $DOCKER_REPO_NAME

echo "Build and deployment completed successfully!"
