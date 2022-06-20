FROM node:16
RUN mkdir -p /var/www/event
WORKDIR /var/www/event
ADD . /var/www/event
COPY package*.json /var/www/event
RUN npm install
