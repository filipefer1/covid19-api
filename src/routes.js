const express = require("express");

const DiaController = require('./controllers/DiaController');

const routes = express.Router();

routes.post("/dia", DiaController.create);

routes.get("/casos", DiaController.getAll);
routes.get("/casos/:date", DiaController.getAllStatesOnDate);
routes.get("/:uf", DiaController.onlyState); 
routes.get("/:uf/:date", DiaController.getOneStateOnDate); 

module.exports = routes;
