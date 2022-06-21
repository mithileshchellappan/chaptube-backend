const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const v1Router = require("./v1/routes");
const chapsRouter = require("./v1/routes/chapsRouter");
const fileServer = require("./fileServer");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/api/v1", v1Router);
app.use("/api/v1/download", chapsRouter);

app.use('/files',express.static(path.join(__dirname,'temp')))

var server = app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

server.setTimeout(5000000)


