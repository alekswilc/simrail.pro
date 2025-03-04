FROM node:18-alpine
 
WORKDIR /app
 
COPY package*.json ./
 
RUN npm install

COPY . .

RUN npm install -g live-server

RUN npm run rawbuild
EXPOSE 80
 
CMD ["npm", "start"]