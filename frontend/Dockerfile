FROM node:latest

WORKDIR ./app

RUN echo "start"

COPY . .

RUN npm install
RUN npm run build

CMD ["npx","serve", "-s", "build"]