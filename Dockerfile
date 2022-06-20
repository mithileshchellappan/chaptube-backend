FROM node:16

ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /usr/src/app

# RUN apt-get install node npm

RUN npm config set package-lock false

COPY package*.json ./

RUN npm install


# RUN wget https://www.ffmpeg.org/releases/ffmpeg-4.0.2.tar.gz
# RUN tar -xzf ffmpeg-4.0.2.tar.gz; rm -r ffmpeg-4.0.2.tar.gz
# RUN cd ./ffmpeg-4.0.2; ./configure --enable-gpl --enable-libmp3lame --enable-decoder=mjpeg,png --enable-encoder=png --enable-openssl --enable-nonfree --disable-x86asm


# RUN cd ./ffmpeg-4.0.2; make
# RUN  cd ./ffmpeg-4.0.2; make install

# RUN apt-get install ffmpeg-4 libavcodec-extra-53

COPY . .

EXPOSE 3001
CMD ["node","index.js"]
