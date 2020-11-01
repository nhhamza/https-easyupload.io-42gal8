const htmlStatusCodes = require("../shared/constants").htmlStatusCodes;
const traslates = require("../shared/constants").traslates;
const scoresService = require("../services/scores");

/**
 * @api {get} /getScores get scores
 * @apiDescription get scores
 *
 * @apiParam (Body) {String} name user name.
 * @apiParam (Body) {String} word palindrome word.
 *
 * @apiSuccess {Name} user name.
 * @apiSuccess {Points} points scores.
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * {
 * }
 *
 * @apiErrorExample {json} Error
 *  HTTP/1.1 400 Bad Request
 *
 */
const submitEntry = async (req, res) => {
  try {
    scoresService.submitEntry(req);

    return res.status(htmlStatusCodes.ok.code).send(
      JSON.stringify({
        message: htmlStatusCodes.ok.message, // we can create a function to create always the same returned object by message
        description: traslates.ValiePalindrome
      })
    );
  } catch (error) {
    // we should create an error class to manage errors
    return res.status(htmlStatusCodes.badRequest.code).send(
      JSON.stringify({
        message: htmlStatusCodes.badRequest.message,
        description: error.toString()
      })
    );
  }
};

/**
 * @api {get} /getScores get scores
 * @apiDescription get scores
 *
 * @apiSuccess {Name} user name.
 * @apiSuccess {Points} points scores.
 *
 * @apiSuccessExample Success-Response:
 *
 * HTTP/1.1 200 OK
 *
 * {
 * }
 *
 * @apiErrorExample {json} Error
 *  HTTP/1.1 400 Bad Request
 *
 */
const getScores = async (req, res) => {
  return res
    .status(htmlStatusCodes.ok.code)
    .send(JSON.stringify(await scoresService.getFirstItems()));
};

module.exports = { getScores, submitEntry };
