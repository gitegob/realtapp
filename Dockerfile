FROM node:14.16.0-alpine3.10

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE $PORT

CMD yarn run start