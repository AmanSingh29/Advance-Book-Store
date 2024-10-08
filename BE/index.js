require("dotenv").config();
const express = require("express");
const connectToDb = require("./Db/connection");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

require("./Modals/users.mo.js");
require("./Modals/books.mo.js");

app.use("/v1", require("./Routes/auth.rt"));
app.use("/v1", require("./Routes/upload-file.rt.js"));
app.use("/v1/books", require("./Routes/books.rt.js"));

app.listen(PORT, () => {
  connectToDb();
  console.log(`Server has started on ${PORT}`);
});
