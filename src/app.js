const express = require("express");
const mongoose = require("mongoose");
require('dotenv').config()

const routes = require("./routes");

const app = express();

app.use('/', express.static(__dirname + '/public'));
app.use(express.json());
app.use(routes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

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
