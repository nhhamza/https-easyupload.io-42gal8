var express = require("express");
const bodyParser = require("body-parser");
const isEmptyValue = require("./shared/validtions");
const htmlStatusCodes = require("./shared/constants").htmlStatusCodes;
const traslates = require("./shared/constants").traslates;
const itemsToBeShown = require("./shared/constants").itemsToBeShown;
const isPalindromeText = require("./shared/palindrome");

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));

var scores = new Array();

const scoreUser = (name, newScore) => {
  //we should manage if we accepted names upperCase LowerCase because we use it as identifier. better uuid ..
  scores[name] === undefined
    ? (scores[name] = newScore)
    : (scores[name] = scores[name] + newScore);
};

const getFirstsItemsByObject = async (dict, numberOfItems) => {
  // Create items array
  var items = Object.keys(dict).map(key => ({ name: key, points: dict[key] }));
  // Sort the array based on the second element and get first elements
  return items
    .sort((first, second) => second.points - first.points)
    .slice(0, numberOfItems);
};

//we can create an api object with all routes insted of hard coded
app.get("/", function(req, res) {
  res.render("index.html");
});

app.post("/api/submitEntry", (req, res) => {
  const { name, word } = req.body;

  if (isEmptyValue(word) || isEmptyValue(name)) {
    // name should be extracted form JWT, bearer etc ..
    res.status(htmlStatusCodes.badRequest.code).send(
      JSON.stringify({
        message: htmlStatusCodes.badRequest.message,
        description: traslates.nameShouldNotBeEmpty
      })
    );
    return;
  }

  if (!isPalindromeText(word)) {
    res.status(htmlStatusCodes.ok.code).send(
      JSON.stringify({
        message: htmlStatusCodes.ok.message,
        description: traslates.woldIsNotaValidPalindrome
      })
    );
    return;
  }

  scoreUser(name, word.length);

  res.status(htmlStatusCodes.ok.code).send(
    JSON.stringify({
      message: htmlStatusCodes.ok.message, // we can create a function to create always the same returned object by message
      description: traslates.ValiePalindrome
    })
  );
});

app.get("/api/getScores", async (req, res) => {
  res
    .status(htmlStatusCodes.ok.code)
    .send(JSON.stringify(await getFirstsItemsByObject(scores, itemsToBeShown)));
});

var port = 3000;
app.listen(port, function() {
  console.log("Server", process.pid, "listening on port", port);
});
