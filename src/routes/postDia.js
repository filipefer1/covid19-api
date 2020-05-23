const express = require("express");

const DiaController = require('../controllers/DiaController');

const routes = express.Router();

routes.post("/dia", DiaController.create);

module.exports = routes;