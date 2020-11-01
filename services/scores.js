const isPalindromeText = require("../shared/palindrome");
const itemsToBeShown = require("../shared/constants").itemsToBeShown;
const isEmptyValue = require("../shared/validations");
const traslates = require("../shared/constants").traslates;

var scores = new Array();

/**
 *
 * @param {name} name
 * @param {newScore} newScore
 */
const scoreUser = (name, newScore) => {
  //we should manage if we accepted names upperCase LowerCase because we use it as identifier. better uuid ..
  scores[name] === undefined
    ? (scores[name] = newScore)
    : (scores[name] = scores[name] + newScore);
};

/**
 * getFirstItems
 */
const getFirstItems = async () => {
  // Create items array
  var items = Object.keys(scores).map(key => ({
    name: key,
    points: scores[key]
  }));
  // Sort the array based on the second element and get first elements
  return items
    .sort((first, second) => second.points - first.points)
    .slice(0, itemsToBeShown);
};

/**
 *
 * @param {request} req
 */
const submitEntry = async req => {
  const { name, word } = req.body;

  if (isEmptyValue(word) || isEmptyValue(name)) {
    // name  should be extracted form JWT, bearer etc ..

    throw new Error(htmlStatusCodes.badRequest.message);
  }

  if (!isPalindromeText(word)) {
    return res.status(htmlStatusCodes.ok.code).send(
      JSON.stringify({
        message: htmlStatusCodes.ok.message,
        description: traslates.woldIsNotaValidPalindrome
      })
    );
    return;
  }

  scoreUser(name, word.length);
};

module.exports = { getFirstItems, submitEntry };
