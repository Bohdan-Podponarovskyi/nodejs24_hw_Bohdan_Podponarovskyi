# Use the official Node.js image as the base image with Alpine Linux
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and yarn.lock files to the working directory
COPY ./package.json ./yarn.lock ./

# Install the application dependencies using yarn
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN yarn build

# Specify the command to run the application
CMD ["yarn", "start"]