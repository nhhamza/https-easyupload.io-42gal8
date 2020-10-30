module.exports = {
  emptyCharacter: "",
  itemsToBeShown: 5,
  regularExpressionForSpaces: /\s+/g,
  htmlStatusCodes: {
    badRequest: { code: 400, message: "Bad request" },
    ok: { code: 200, message: "Ok" }
  },
  traslates: {
    nameShouldNotBeEmpty: "name should not be empty.",
    woldIsNotaValidPalindrome:
      "Intorduced word is not a valid palindrome, Please try again.",
    ValiePalindrome: "Well done."
  }
};
