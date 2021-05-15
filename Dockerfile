FROM node:14-alpine

WORKDIR /project
ADD . .

RUN yarn

EXPOSE 3009
CMD yarn typeorm migration:run && yarn start
