#!/bin/bash

# Exit on error
set -e

# Define variables
BUILD_IMAGE="blog-app-build"
NGINX_CONTAINER_NAME="writeonce-webserver"
OUTPUT_DIR="dist"
DIST_DIR="browser"

# Step 1: Build Angular application
echo "Building Angular application..."
docker build -t $BUILD_IMAGE -f Dockerfile .

# Step 2: Create output directory if it doesn't exist
mkdir -p $OUTPUT_DIR

# Step 3: Copy the build artifacts from the build container to the output directory
echo "Copying build artifacts..."
docker run --rm -v "$(pwd)/$OUTPUT_DIR:/output" $BUILD_IMAGE sh -c "cp -r $DIST_DIR /output"

# Step 4: Copy the build artifacts into the existing Nginx container
echo "Copying build artifacts to Nginx container..."
docker cp $DIST_DIR/. $NGINX_CONTAINER_NAME:/usr/share/nginx/html/

# Step 5: Restart the Nginx container to apply changes
echo "Restarting Nginx container..."
docker restart $NGINX_CONTAINER_NAME

echo "Deployment completed successfully."
