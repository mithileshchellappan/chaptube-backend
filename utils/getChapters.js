const ytdl = require('ytdl-core')

const getChapters =async (url) => {
    return new Promise(async (resolve, reject) => {
      try {
        var ans = await ytdl.getInfo(url);
    var id = ans.videoDetails.videoId
  var length = ans.videoDetails.lengthSeconds;
  var chaps = ans.videoDetails?.chapters;
  if(chaps.length<=0) return {status:"error",message:"no chapters in video"}
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
  
  resolve( {status:"success",message:{chaps,id}})
      } catch (error) {
        reject({status:"error",message:error})
      }
    })
}

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

module.exports = getChapters