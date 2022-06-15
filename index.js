const fs = require("fs");
const ytdl = require("ytdl-core");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
const ffmpeg = require("fluent-ffmpeg");
const archiver = require("archiver");
ffmpeg.setFfmpegPath(ffmpegPath);

var url = "https://www.youtube.com/watch?v=ZwPLhyUgm-g";

const getInfo = async () => {
  var ans = await ytdl.getInfo(url);
  var length = ans.videoDetails.lengthSeconds;
  var chaps = ans.videoDetails.chapters;
  chaps.forEach((val, i) => {
    chaps[i] = {
      ...val,
      i,
      start_time: fmtMSS(val.start_time),
      duration:
        i + 1 >= chaps.length
          ? parseInt(length)
          : chaps[i + 1].start_time - val.start_time,
      end_time: i + 1 >= chaps.length ? length : chaps[i + 1].start_time
    };
  });
  if(!fs.existsSync(`${__dirname}/videos/`)){fs.mkdirSync(`${__dirname}/videos/`)}
  const outputParentDir = `${__dirname}/videos/${ans.videoDetails.videoId}/`;
  if(!fs.existsSync(outputParentDir)) {fs.mkdirSync(outputParentDir);}
  downloadVideo(
    `${outputParentDir}${ans.videoDetails.videoId}.mp4`,
    url,
    chaps,
    ans.videoDetails.videoId
  );
};

function fmtMSS(e) {
  var h = Math.floor(e / 3600)
      .toString()
      .padStart(2, "0"),
    m = Math.floor((e % 3600) / 60)
      .toString()
      .padStart(2, "0"),
    s = Math.floor(e % 60)
      .toString()
      .padStart(2, "0");

  return h + ":" + m + ":" + s;
}

const downloadVideo = async (fileName, url, chaps, id) => {
  await ytdl(url)
    .pipe(fs.createWriteStream(fileName))
    .on("finish", () => {
      splice(fileName, chaps, id);
    });
};

const splice = async (fileName, chaps, id) => {
  if (chaps.length <= 0) return;
  const outputDir = `${__dirname}/videos/${id}/chapterVids/`;
  if(!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
  var itemsProcessed = 0
  await chaps.forEach(({ title, start_time, duration, i }) => {
    ffmpeg(fileName)
      .setStartTime(start_time)
      .setDuration(duration)
      .output(`${outputDir}/${i}_${title.replace(/[^a-zA-Z ]/g, "")}.mp4`)
      .on("end", function (err) {
        if (!err) {
          console.log("conversion Done " + title);
        }
        itemsProcessed++;

        if(itemsProcessed==chaps.length){
           zipper(outputDir,id)
        }
      })
      .on("error", function (err) {
        console.log(title + " error: ", err);
      })
      .run()



  });
 
  
};

const zipper = async (outputDir, id) => {
  
  const archive = archiver('zip', { zlib: { level: 9 }});
  const stream = fs.createWriteStream(`${__dirname}/videos/${id}/${id}.zip`);

  
    console.log('inside')
    archive
      .directory(outputDir, id)
      .on('error', err => reject(err))
      .pipe(stream)
    ;

    stream.on('close', () => {
      fs.rmSync(`${__dirname}/videos/${id}/chapterVids`,{recursive:true,force:true})
      fs.rmSync(`${__dirname}/videos/${id}/${id}.mp4`)
    });
    archive.finalize();
  
};

getInfo();
