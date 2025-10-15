FROM node:22.19.0-alpine3.21
WORKDIR /frontend/

# Copying all directories 
COPY . .


# Installing neccessary dependencies 
RUN npm install 


# Building the application 
RUN npm run build 

# Deploying the application 
CMD ["npx","serve","-s","dist"]

EXPOSE 3000
