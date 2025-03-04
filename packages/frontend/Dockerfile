FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn add -D vite
RUN yarn global add live-server
RUN yarn rawbuild

EXPOSE 80
WORKDIR /app/dist
CMD ["yarn", "start"]
