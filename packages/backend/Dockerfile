FROM node:21-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN yarn add -D typescript
RUN yarn rawbuild

RUN ls


# Install Doppler CLI
RUN wget -q -t3 'https://packages.doppler.com/public/cli/rsa.8004D9FF50437357.key' -O /etc/apk/keys/cli@doppler-8004D9FF50437357.rsa.pub && \
    echo 'https://packages.doppler.com/public/cli/alpine/any-version/main' | tee -a /etc/apk/repositories && \
    apk add doppler



ENTRYPOINT ["doppler", "run", "--"]
CMD ["node", "/app/dist"]