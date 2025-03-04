FROM node:18-alpine
 
WORKDIR /app
 
COPY package*.json ./
 
RUN npm install
RUN npm install -D vite
RUN npm install -g live-server

COPY . .

RUN npm run rawbuild

EXPOSE 80
 
CMD ["npm", "start"]