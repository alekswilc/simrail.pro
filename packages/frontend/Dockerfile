FROM node:22-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN yarn
COPY . .
RUN yarn add -D vite
RUN yarn rawbuild

FROM nginx:stable-alpine AS production

COPY --from=build /app/dist/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
