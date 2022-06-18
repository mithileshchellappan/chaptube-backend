const ytdl = require("ytdl-core");
const fs = require("fs");
const videoDownloader = async (destinationFolder, url, id, chaps) => {
  return new Promise((resolve,reject)=>{
    try{var fileName = destinationFolder + id + ".mp4";

  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder);
  }
   ytdl(url)
    // .on("response", function (res) {
    //   console.log("inside response");
    //   var totalSize = res.headers["content-length"];
    //   var dataRead = 0;
    //   var percent = dataRead / totalSize;
    //   console.log(`Started downloading ${id}`);
    //   res.on("data", function (data) {
    //     dataRead += data.length;
    //     console.log((percent * 100).toFixed(2) + "% ");
    //   });
    // })
    .on("finish", () => {
      console.log(`Finished downloading ${id} video`);
      resolve( {status:"success",message:fileName})
      // splice(fileName, chaps, id);
    }).on("error",(e)=>{
      reject( {status:"error",message:e})
    })
    .pipe(fs.createWriteStream(fileName));}
    catch (e){
      reject( {status:"error",message:e})
    }
  })
    
};

module.exports = videoDownloader;
