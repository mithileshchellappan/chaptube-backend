module.exports = (PORT) => {
  const http = require("http");
  const path = require("path");
  const url = require("url");
  const fs = require('fs')
  http
    .createServer((req, res) => {
      var request = url.parse(req.url, true);

      var action = request.pathname;

      var filePath = path.join(__dirname,'..', action).split("%20").join(" ");
      console.log(filePath);
      fs.exists(filePath, function (exists) {
        if (!exists) {
          res.writeHead(404, {
            "Content-Type": "text/plain"
          });
          res.end("404 Not Found");
          return;
        }

        var ext = path.extname(action);

        var contentType = "text/plain";
        if (ext === ".zip") {
          contentType = "application/zip";
        } else if (ext === ".mp4") {
          contentType = "video/mp4";
        }else if(ext===".js"||ext===".json"||ext===".gitignore"){
          res.writeHead(401, {
            "Content-Type": "text/plain"
          });
           res.end(`UNAUTHORIZED`)
           return
        }

        res.writeHead(200, {
          "Content-Type": contentType
        });

        fs.readFile(filePath, function (err, content) {
          res.end(content);
        });
      });
    })

    .listen(PORT, "127.0.0.1");
};
