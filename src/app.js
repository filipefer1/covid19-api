const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()

const routes = require("./routes");

const app = express();

app.use(express.json());
app.use(routes);

mongoose.connect(
  `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0-xqsrx.mongodb.net/covid19?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(() => {
  app.listen(3333);
}).catch(err => {
  return err;
});
