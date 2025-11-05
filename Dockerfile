FROM node:22.19.0-alpine3.21
WORKDIR /frontend/

# Copying all directories 
COPY . .


# Accept build-time Vite arg
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

# Installing neccessary dependencies 
RUN npm install 


# Building the application 
RUN npm run build 

# Deploying the application 
CMD ["npx","serve","-s","dist"]

EXPOSE 3000
