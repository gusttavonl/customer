FROM node:14-alpine as customer-api

WORKDIR /usr/src/app/

COPY package*.json ./

COPY . .

RUN npm i -g @nestjs/cli

RUN npm install

RUN npm link webpack

RUN npm run build

CMD [ "npm", "run", "start:prod" ]