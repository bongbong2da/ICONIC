#FROM node:latest
#
#WORKDIR /
#
#ENV PATH /app/node_modules/.bin:$PATH
#
#COPY package*.json ./
#
#RUN npm install
#
#COPY ./ ./
#
#EXPOSE 3000
#
#CMD ["npm", "start"]

FROM node:latest

WORKDIR /app

RUN mkdir ./build
COPY ./build ./build

EXPOSE 3000

RUN npm install
RUN npm run build

ENTRYPOINT ["npx", "serve", "-l", "3000", "-s", "build"]
