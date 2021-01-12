FROM node:12.20.1-stretch
ADD . /app
WORKDIR /app
RUN npm i