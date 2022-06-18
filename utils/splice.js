const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
ffmpeg.setFfmpegPath(ffmpegPath);

const splice = async (chapterDir,videoFile, chaps, id) => {
  return new Promise(async(resolve,reject)=>{
    try {
        if (chaps.length <= 0) return;

        if (!fs.existsSync(chapterDir)) fs.mkdirSync(chapterDir);
        var itemsProcessed = 0;
        await chaps.forEach( ({ title, start_time, duration, i }) => {
           ffmpeg(videoFile)
            .setStartTime(start_time)
            .setDuration(duration)
            .output(`${chapterDir}/${i}_${title.replace(/[^a-zA-Z ]/g, "")}.mp4`)
            .on("end", function (err) {
              if (!err) {
                console.log("conversion Done " + title);
            }
            itemsProcessed++;
            
            if (itemsProcessed == chaps.length) {
                  resolve( { status: "success", message: chapterDir })
              }
            })
            .on("error", function (e) {
              console.log(title + " error: ", e);
              reject( { status: "error", message: e })
            })
            .run();
        });
      } catch (e) {
          reject({status:"error",message:e})
      }
  })
};

module.exports = splice;
