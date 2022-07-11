FROM node:14

WORKDIR /usr/app

COPY . ./

RUN npm ci

RUN npm run build

EXPOSE 4100

CMD ["npm", "run", "start"]
