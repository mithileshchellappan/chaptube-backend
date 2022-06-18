const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const v1Router = require("./v1/routes");
const chapsRouter = require("./v1/routes/chapsRouter");
const fileServer = require("./fileServer");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/api/v1", v1Router);
app.use("/api/v1/download", chapsRouter);

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});

fileServer(PORT)

