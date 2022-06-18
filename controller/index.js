const allChapDownloader = require("../services/allChapDownloader");
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

  return res.status(200).send({url:`${req.hostname}${dynamicPath}`});
};

module.exports = { downloadAllChaps };
