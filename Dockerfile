FROM node:14

WORKDIR /projma

COPY package*.josn ./

RUN npm install

COPY . .

ENV PORT=8080

EXPOSE 8080

CMD [ "npm", "start" ]