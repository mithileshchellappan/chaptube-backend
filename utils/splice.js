const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
ffmpeg.setFfmpegPath(ffmpegPath);

const splice = async (fileName, chaps, id) => {
  return new Promise(async(resolve,reject)=>{
    try {
        if (chaps.length <= 0) return;
        const outputDir = path.join(__dirname, "..", "videos", id, "chapterVids");
        if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir);
        var itemsProcessed = 0;
        await chaps.forEach( ({ title, start_time, duration, i }) => {
           ffmpeg(fileName)
            .setStartTime(start_time)
            .setDuration(duration)
            .output(`${outputDir}/${i}_${title.replace(/[^a-zA-Z ]/g, "")}.mp4`)
            .on("end", function (err) {
              if (!err) {
                console.log("conversion Done " + title);
            }
            itemsProcessed++;
            
            if (itemsProcessed == chaps.length) {
                  resolve( { status: "success", message: outputDir })
                //  zipper(outputDir,id)
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
