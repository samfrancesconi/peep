FROM node:18 as build

WORKDIR /usr/src/app

ARG ENVIRONMENT

COPY . /usr/src/app

COPY "./docker/.env-${ENVIRONMENT}" ./.env

RUN npm install

RUN npm run build

RUN rm -rf node_modules


FROM nginx:1.19

COPY ./docker/nginx/nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/src/app/dist /usr/share/nginx/html

EXPOSE 8080:8080
