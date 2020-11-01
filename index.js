var express = require("express");
const bodyParser = require("body-parser");
const ApiRoutes = require("./routes/scores");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use("/api", ApiRoutes);

//we can create an index controller
app.get("/", function(req, res) {
  res.render("index.html");
});

var port = 3000;
app.listen(port, function() {
  console.log("Server", process.pid, "listening on port", port);
});
