const fs = require("fs");
const downloadVideo = require('./utils/videoDownloader')
const getChapters = require('./utils/getChapters')
const splice = require('./utils/splice');
const zipper = require("./utils/zipper");

var url = "https://www.youtube.com/watch?v=H19_JKw4QN4";

const getInfo = async () => {

  var res = await getChapters(url)
  if(res.status === "error"){console.log(res.message);  return res.message}
  var {message:{chaps,id}}=res
  if(!fs.existsSync(`${__dirname}/videos/`)){fs.mkdirSync(`${__dirname}/videos/`)}
  const outputParentDir = `${__dirname}/videos/${id}/`;
  // if(!fs.existsSync(outputParentDir)) {fs.mkdirSync(outputParentDir);}

  var vid = await downloadVideo(
    outputParentDir,
    url,
    id,
    chaps,
  );

  if(vid.status=="error"){console.log(vid.message); return vid.message}

  var {status,message} = await splice(vid.message,chaps,id)
  if(status==="error"){console.log(message); return message}
  var zipped = await zipper(message,id,vid.message)
  console.log(zipped)

};

getInfo();
