const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

var zipper = async (outputDir, id,vid) => {
    return new Promise(async(resolve, reject) => {
        try {
        const archive = archiver("zip", { zlib: { level: 9 } });
      var outDir = path.join(__dirname, "..", "videos", id);
      var chapterDir = path.join(__dirname,"..","videos",id,"chapterVids")
      var fileName = outDir + `${id}.zip`;
      const stream = fs.createWriteStream(fileName);

      console.log("inside");
      await archive
        .directory(outputDir, id)
        .on("error", (err) => reject({ status: "error", message: err }))
        .pipe(stream);

      stream.on("close", () => {
        fs.rmSync(chapterDir, {
          recursive: true,
          force: true
        });
        fs.rmSync(vid);
        resolve({ status: "success", message: fileName });
      });
      archive.finalize();
    } catch (e) {
      reject({ status: "error", message: e });
    }
  });
};

module.exports = zipper
