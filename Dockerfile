FROM node:14

WORKDIR /app

COPY package*.json ./

RUN yarn 

COPY . . 

