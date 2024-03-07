##### Building Base image #####
FROM node:18-alpine

# Set timezone
RUN apk add --no-cache tzdata
ENV TZ=America/Bogota

RUN mkdir -p /app
WORKDIR /app

## Copy package files
COPY yarn.loc[k] package.json .yarnrc.ym[l] ./
COPY .yarn ./.yarn

## Install packages
# RUN yarn set version stable
RUN yarn install

EXPOSE 6006

ENV NODE_ENV=development
## Install util packages
RUN apk add --update --no-cache vim

COPY . .

CMD [ "yarn", "storybook" ]
