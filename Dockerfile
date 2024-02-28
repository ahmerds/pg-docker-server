FROM node:20-alpine

LABEL maintainer="Ahmerd Ash"

WORKDIR /usr/src/app/

# Install dependencies
RUN apk update
RUN apk add openssl
RUN apk add postgresql-client --repository=https://dl-cdn.alpinelinux.org/alpine/v3.19/main
RUN rm -rf /var/cache/apk/*

COPY ./src ./src
COPY package.json .

CMD ["npm", "start"]
