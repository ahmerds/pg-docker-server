FROM node:20-alpine

LABEL maintainer="Ahmerd Ash"

# Install dependencies
RUN apk update
RUN apk add openssl
RUN apk add postgresql-client --repository=https://dl-cdn.alpinelinux.org/alpine/v3.19/main
RUN rm -rf /var/cache/apk/*

ADD ./src .

CMD ["npm", "start"]
