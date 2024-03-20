const { BadRequestError } = require("./expressError");


/** Convert strNums like ["1","2","3"] to [1, 2, 3]. */

function convertStrNums(strNums) {
  // if the conversion isn't successful, throw a BadRequestError and will
  // be handled in your route

  const queryIntegers = (strNums).split(',').map(n => Number(n));

  if (queryIntegers.some(num => isNaN(num))) { // if has NaN
    return undefined;
  } else {
    return queryIntegers.map(n => Number(n));
  }
}


module.exports = { convertStrNums };