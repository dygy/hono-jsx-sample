FROM node:20

WORKDIR /app
COPY package.json .
RUN npm install
EXPOSE 5173
EXPOSE 80

COPY app .
CMD npm run build
CMD npm run start
