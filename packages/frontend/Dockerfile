FROM node:18-alpine

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm i -g serve vite

ARG VITE_API_URL
ENV VITE_API_URL $VITE_API_URL

ARG VITE_STATS_KEY
ENV VITE_STATS_KEY $VITE_STATS_KEY

COPY . .

RUN npm run rawbuild

COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

EXPOSE 3000

ENTRYPOINT [ "/docker-entrypoint.sh" ]
CMD [ "serve", "-s", "dist" ]