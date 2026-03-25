FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV DATABASE_URL="file:./prisma/dev.db"

RUN npx prisma generate

EXPOSE 3000

# roda a migration e depois inicia o servidor
CMD ["sh", "-c", "npx prisma migrate deploy && node src/server.js"]