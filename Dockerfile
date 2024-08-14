# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:18.17.1-alpine AS build

# Set the working directory
WORKDIR /app

COPY package*.json ./

# Install all the dependencies
RUN npm install
COPY . .
# Generate the build of the application
RUN npm run build --prod --output=dist