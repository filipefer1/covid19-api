require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors")

const getRoutes = require("./routes/getCasos");
const postRoutes = require("./routes/postDia");
const faviconHandler = require('./utils/faviconHandler');

const app = express();

app.use('/', express.static(__dirname + '/public'));
 
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(faviconHandler);
app.use(getRoutes);
app.use(postRoutes); 

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
  app.listen(process.env.PORT || 3333);
}).catch(err => {
  return err;
});

// https://xx9p7hp1p7.execute-api.us-east-1.amazonaws.com/prod/PortalEstado
