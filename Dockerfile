# Builder stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 4001

CMD ["npm", "start"]