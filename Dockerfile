FROM node:20

WORKDIR /usr/src/app

COPY . .
RUN npm install --production
RUN npm run start
CMD ["npm", "start"]
