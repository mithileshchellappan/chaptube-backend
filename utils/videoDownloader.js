const ytdl = require("ytdl-core");
const fs = require("fs");
const videoDownloader = async (destinationFolder,videoFile, url, id) => {
  return new Promise((resolve,reject)=>{
    // console.log(destinationFolder,url,id)
    console.log('inside videoDownloader')
    try{

  if (!fs.existsSync(destinationFolder)) {
    fs.mkdirSync(destinationFolder);
  }
   ytdl(url)
  
    .on("finish", () => {
      console.log(`Finished downloading ${id} video`);
      resolve( {status:"success",message:videoFile})
    }).on("error",(e)=>{
      reject( {status:"error",message:e})
    })
    .pipe(fs.createWriteStream(videoFile));}
    catch (e){
      reject( {status:"error",message:e})
    }
  })
    
};

module.exports = videoDownloader;
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