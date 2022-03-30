FROM node:17-alpine3.14
WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json", "/usr/src/app/"]

COPY ./ /usr/src/app

ENV NODE_ENV=production

RUN npm install --production

EXPOSE 9000

CMD ["node", "--experimental-modules", "--experimental-specifier-resolution=node", "/usr/src/app/index.js"]
