# Use Node Alpine image
# Use Node Alpine image
FROM node:22.19.0-alpine3.21

# Set working directory
WORKDIR /frontend


# Copy the rest of the source code
COPY . .

# Install dependencies
RUN npm install

# ENV VITE_API_BASE_URL="http://4.224.75.153"


# Build-time environment variable for Vite
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Build the application
RUN npm run build

# Serve the built app
CMD ["npx", "serve", "-s", "dist"]


# Expose port
EXPOSE 3000
