FROM node:16
RUN mkdir -p /var/www/user
WORKDIR /var/www/user
ADD . /var/www/user
COPY package*.json /var/www/user
RUN npm install
