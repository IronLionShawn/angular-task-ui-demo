FROM node:16-alpine3.15
WORKDIR /var/www/ui

COPY package.json /var/www/ui/
COPY package-lock.json /var/www/ui/
RUN npm install

COPY . /var/www/ui

RUN npm run build
