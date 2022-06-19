FROM node:16

WORKDIR /usr/src/app

RUN npm config set package-lock false

COPY package*.json ./

RUN npm install

RUN sudo apt install ffmpeg

COPY ..

EXPOSE 3000

CMD ["node","index.js"]