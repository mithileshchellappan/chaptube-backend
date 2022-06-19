FROM ubuntu:18.04

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /usr/src/app

RUN apt-get install node npm

RUN npm config set package-lock false

COPY package*.json ./

RUN npm install
RUN adduser --disabled-password --gecos '' docker
RUN adduser docker sudo

RUN apt-get update && \
    apt-get install -y software-properties-common && \
    rm -rf /var/lib/apt/lists/*

RUN add-apt-repository ppa:jonathonf/ffmpeg-4
RUN apt-get update && apt-get install -y ffmpeg

# RUN apt-get install ffmpeg-4 libavcodec-extra-53

COPY . .

EXPOSE 3000
USER docker
CMD ["node","index.js"]