const splice = require("../utils/splice");
const videoDownloader = require("../utils/videoDownloader");
const path = require("path");
const fs = require("fs");
const zipper = require("../utils/zipper");

const allChapDownloader = async (url, id, chaps) => {
    var outputParentDir = path.join(__dirname, "../temp");
  if (!fs.existsSync(outputParentDir)) {
    fs.mkdirSync(outputParentDir);
  }
  
  const parentDir = path.join(__dirname, "..", "temp", id);
  const videoFile = path.join(parentDir,`${id}.mp4`)
  const chapterDir = path.join(parentDir, "chapterVids");
  const zipFile = path.join(parentDir, `${id}.zip`);
  

  var vid = await videoDownloader(parentDir,videoFile, url, id);

  var { status, message } = vid;

  if (status === "error") {
    return vid;
  }


  var spliced = await splice(chapterDir,videoFile, chaps, id).catch((e) => {
    console.log(e);
    return e
  });
  console.log(spliced);

  var zipped = await zipper(chapterDir,zipFile,id,vid).catch((e) => {
      return e})
      console.log(zipper)
  return zipped
};

module.exports = allChapDownloader;
