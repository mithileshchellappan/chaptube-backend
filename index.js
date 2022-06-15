const fs = require("fs");
const ytdl = require("ytdl-core");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
ffmpeg.setFfmpegPath(ffmpegPath);

var url = "https://www.youtube.com/watch?v=377AQ0y6LPA";

const getInfo = async () => {
  var ans = await ytdl.getInfo(url);
  var length = ans.videoDetails.lengthSeconds;
  var chaps = ans.videoDetails.chapters;
  chaps.forEach((val, i) => {
    chaps[i] = {
      ...val,
      i,
      start_time:fmtMSS(val.start_time),
      duration:
        i + 1 >= chaps.length
          ? parseInt(length)
          : chaps[i + 1].start_time - val.start_time,
      end_time: i + 1 >= chaps.length ? length : chaps[i + 1].start_time
    };
  });
  downloadVideo(`${__dirname}/videos/${ans.videoDetails.videoId}.mp4`,url,chaps,ans.videoDetails.videoId)
};

function fmtMSS(e){var h = Math.floor(e / 3600).toString().padStart(2,'0'),
m = Math.floor(e % 3600 / 60).toString().padStart(2,'0'),
s = Math.floor(e % 60).toString().padStart(2,'0');

return h + ':' + m + ':' + s;}

const downloadVideo = async (fileName, url, chaps,id) => {
  await ytdl(url).pipe(fs.createWriteStream(fileName)).on('finish',()=>{
      splice(fileName,chaps,id)
  })
  


};

const splice = async (fileName, chaps,id) => {
if(chaps.length<=0)return;

fs.mkdirSync(`${__dirname}/videos/${id}/`)

  chaps.forEach(({title, start_time,duration,i}) => {
    ffmpeg(`./videos/${id}.mp4`)
      .setStartTime(start_time)
      .setDuration(duration)
      .output(`${__dirname}/videos/${id}/${i}_${title.replace(/[^a-zA-Z ]/g, "")}.mp4`)
      .on("end", function (err) {
        if (!err) {
          console.log("conversion Done "+title);
        }
      })
      .on("error", function (err) {
        console.log(title+" error: ", err);
      })
      .run();
  });
};

getInfo();
