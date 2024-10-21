require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectToDb = require("./Db/connection");
const path = require("path");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 8000;
const appPrefix = "/v1/";

app.use(cors());
app.use(express.json());

const models = path.join(__dirname, "/models");
fs.readdirSync(models)
  .filter((file) => ~file.search(/^[^.].*\.js$/))
  // eslint-disable-next-line global-require
  .forEach((file) => require(path.join(models, file)));
fs.readdirSync("./routes").forEach((file) => {
  if (file.substr(-3) == ".js") {
    // eslint-disable-next-line global-require
    let route = require("./routes/" + file);
    let routeName = file.slice(0, -6);
    app.use(appPrefix + routeName, route);
    route.stack.forEach((route) => {
      let routePath = route.route.path;
      let routeMethod = route.route.methods;
      console.log([routeMethod, appPrefix + routeName + routePath]);
    });
  }
});

app.listen(PORT, () => {
  connectToDb();
  console.log(`Server has started at ${new Date()} on PORT: ${PORT}`);
});
