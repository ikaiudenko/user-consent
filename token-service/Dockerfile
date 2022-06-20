FROM node:16
RUN mkdir -p /var/www/token
WORKDIR /var/www/token
ADD . /var/www/token
COPY package*.json /var/www/token
RUN npm install
CMD npm run start:dev
