/** Simple demo Express app. */

const express = require("express");
const app = express();

// useful error class to throw
const { NotFoundError, BadRequestError } = require("./expressError");
const { findMean } = require("./stats");
const { convertStrNums } = require("./utils");

const MISSING = "Expected key `nums` with comma-separated list of numbers.";

/** Finds mean of nums in qs: returns {operation: "mean", result } */
app.get('/mean', function (req, res) {

  let queryNums = req.query.nums;
  let mean;

  // if no params
  if (!(queryNums)) {
    throw new BadRequestError(MISSING);
  }

  const numIntegers = convertStrNums(queryNums);

  // check if any non-numbers
  if (numIntegers) {
    mean = findMean(numIntegers);
  } else {
    throw new BadRequestError(`${queryNums} must be all numbers`)
  }

  return res.json({
    response: {
      operation: "mean",
      value: mean,
    }
  })

});

/** Finds median of nums in qs: returns {operation: "median", result } */


/** Finds mode of nums in qs: returns {operation: "mean", result } */


/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});

/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});



module.exports = app;