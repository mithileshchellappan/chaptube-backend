const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
ffmpeg.setFfmpegPath(ffmpegPath);

const ffmpegSplice = (title,start_time,duration,itemsProcessed,videoFile,chapterDir,i) => {
    console.log(title,start_time,duration,itemsProcessed,videoFile,chapterDir)
    return new Promise  (async(resolve,reject)=>{
        await ffmpeg(videoFile)
            .setStartTime(start_time)
            .setDuration(duration)
            .output(`${chapterDir}/${i}_${title.replace(/[^a-zA-Z ]/g, "")}.mp4`)
            .on("end", function (err) {
              if (!err) {
                console.log("conversion Done " + title);
                itemsProcessed++;
                resolve({status:"success",message:itemsProcessed})
            }
        


            })
            .on("error", function (e) {
              console.log(title + " error: ", e);
              reject( { status: "error", message: e })
            })
            .run();
    })
}

module.exports = ffmpegSplice