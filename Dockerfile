# Use Node Alpine image
FROM node:22.19.0-alpine3.21

# Set working directory
WORKDIR /frontend


# Copy the rest of the source code
COPY . .

# Install dependencies
RUN npm install

# Build the application
RUN npm run build

# Serve the built app
CMD ["npx", "serve", "-s", "dist"]

# Expose port
EXPOSE 3000
