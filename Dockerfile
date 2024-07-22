# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:18.17.1-alpine as build

# Set the working directory
WORKDIR /app

COPY package*.json ./

# Install all the dependencies
RUN npm install
COPY . .
# Generate the build of the application
RUN npm run build --prod --output=dist

# Use official nginx image as the base image
FROM nginx:stable
# COPY nginx/default.conf /etc/nginx/conf.d
# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist/* /usr/share/nginx/html

# Expose port 80
# EXPOSE 80
