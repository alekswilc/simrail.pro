FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn add -D vite
RUN yarn global add live-server
RUN yarn rawbuild

EXPOSE 80
WORKDIR /app/dist
CMD ["live-server", "--port=80", " --entry-file=./index.html"]
