# Use Node Alpine image
FROM node:22.19.0-alpine3.21

# Set working directory
WORKDIR /frontend

# Copy package.json and package-lock.json first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the application
RUN npm run build

# Serve the built app
CMD ["npx", "serve", "-s", "dist"]

# Expose port
EXPOSE 3000
