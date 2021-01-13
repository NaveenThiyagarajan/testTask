FROM node:12.20.1
ADD . /app
WORKDIR /app
RUN npm i