FROM node:13-alpine

ENV NODE_ENV production

WORKDIR /usr/app

COPY . .

RUN yarn install --production

CMD ["yarn", "start"]
