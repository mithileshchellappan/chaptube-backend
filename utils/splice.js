const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");
const path = require("path");
const ffmpegSplice = require("./ffmpegSplicer");
const ffmpegPath = require("@ffmpeg-installer/ffmpeg").path;
ffmpeg.setFfmpegPath(ffmpegPath);

const splice = async (chapterDir,videoFile, chaps, id) => {
  return new Promise(async(resolve,reject)=>{
    try {
      console.log('inside splice')
        if (chaps.length <= 0) return;
        var result;
        if (!fs.existsSync(chapterDir)) fs.mkdirSync(chapterDir);
        var itemsProcessed = 0;
         for(var i=0;i<chaps.length;i=i+2){
          console.log('inside forEach')
          var {title,start_time,duration} = chaps[i]
          
          result = await ffmpegSplice(title,start_time,duration,itemsProcessed,videoFile,chapterDir,i)
          result.status==="error"&&reject(result)
        }
        resolve({status:'success',message:chapterDir})

        await chaps.forEach( ({ title, start_time, duration, i }) => {
          
        });
      } catch (e) {
          reject({status:"error",message:e})
      }
  })
};

module.exports = splice;
