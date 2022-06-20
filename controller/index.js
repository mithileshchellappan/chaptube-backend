const allChapDownloader = require("../services/allChapDownloader");
const videoDownloaderService = require("../services/videoDownloaderService");
const getChapters = require("../utils/getChapters");

const downloadAllChaps = async (req, res) => {
  const {
    body: {  url }
  } = req;
  if (!url) {
    return res.status(400).send("VideoId or URL not found");
  }

  var chap = await getChapters(url).catch((e) => {
    return e;
  });

  var { status, message } = chap;
  if (status === "error") {
    return res.status(400).send("no video id found or wrong url");
  }
  var { chaps, id } = message;
  // console.log(id)

  var result = await allChapDownloader(url, id, chaps);

  if (result.status === "error") {
    return res.status(400).send(result.message);
  }

  var { filePath, fileName,dynamicPath } = result.message;

  return res.status(200).send({url:`${process.env.HOSTNAME}/files/${id}/${id}.zip`});
};

const downloadVideo = async (req, res) => {
  console.log('inside download video controller')
  const {
    body: {  url }
  } = req;
  if (!url) {
    return res.status(400).send("VideoId or URL not found");
  }

  var result  = await videoDownloaderService(url).catch(e=>{
    console.log(e)
    return e
  })
  if(result.message==='error'){
    res.status(500).send('something went wrong try again')
  }
  var {relativePath} = result
  res.status(200).send({url:`${process.env.HOSTNAME}/files/${relativePath}`})


}

module.exports = { downloadAllChaps,downloadVideo };
