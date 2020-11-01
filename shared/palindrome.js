const emptyCharacter = require("./constants").emptyCharacter;
const regularExpressionForSpaces = require("./constants")
  .regularExpressionForSpaces;

const isPalindromeText = (module.exports = text => {
  const cleanedText = text
    .toLowerCase()
    .replace(regularExpressionForSpaces, emptyCharacter);
  const cleanedAndRevesedText = cleanedText
    .split(emptyCharacter)
    .reverse()
    .join(emptyCharacter);

  // we can also take in count spécial character if allowed or not ..

  return cleanedText === cleanedAndRevesedText;
});
