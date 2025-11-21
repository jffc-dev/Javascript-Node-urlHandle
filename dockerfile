FROM node:23-alpine

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm i -g pnpm
RUN pnpm install

COPY . .

EXPOSE 3001