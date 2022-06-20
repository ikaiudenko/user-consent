FROM node:16
RUN mkdir -p /var/www/gateway
WORKDIR /var/www/gateway
ADD . /var/www/gateway
COPY package*.json /var/www/gateway
RUN npm install
CMD npm run start:dev
