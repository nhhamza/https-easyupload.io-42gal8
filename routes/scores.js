const Router = require("express").Router;
const scores = require("../controllers/scores");
const getScores = require("../controllers/scores");
const routes = new Router();

routes.post("/submitEntry", scores.submitEntry); // we can inject validation as express-validation for example
routes.get("/getScores", scores.getScores);

module.exports = routes;
