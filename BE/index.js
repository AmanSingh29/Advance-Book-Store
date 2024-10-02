require("dotenv").config();
const express = require("express");
const connectToDb = require("./Db/connection");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

require("./Modals/users.mo.js");

app.use("/v1", require("./Routes/auth.rt"));

app.listen(PORT, () => {
  connectToDb();
  console.log(`Server has started on ${PORT}`);
});
