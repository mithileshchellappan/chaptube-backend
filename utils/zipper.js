const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

var zipper = async (chapterDir,zipFile, id,vid) => {
    return new Promise(async(resolve, reject) => {
        try {
        const archive = archiver("zip", { zlib: { level: 9 } });
      
      const stream = fs.createWriteStream(zipFile);
          // outputDir=path.join(outputDir+'/')
      console.log(chapterDir)

      console.log("inside");
      archive
        .directory(chapterDir, id)
        .on("error", (err) => reject({ status: "error", message: err }))
        .pipe(stream);

      stream.on("close", () => {
        // fs.rmSync(chapterDir, {
        //   recursive: true,
        //   force: true
        // });
        // fs.rmSync(vid);
        resolve({ status: "success", message: { zipFile,zipFileName:`${id}.zip`,dynamicPath:`/temp/${id}/${id}.zip`} });
      });
      archive.finalize();
    } catch (e) {
      reject({ status: "error", message: e });
    }
  });
};

module.exports = zipper
