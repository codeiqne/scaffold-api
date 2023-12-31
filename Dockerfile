FROM node:18

WORKDIR /var/scaffold
COPY package*.json ./

RUN npm install
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "start:dev"]

FROM php:8.2-apache

WORKDIR /var/www/html
