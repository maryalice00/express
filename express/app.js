const express = require('express');
const app = express();
const ExpressError = require('./expressError');
const { convertAndValidateNumsArray, findMode, findMean, findMedian } = require('./helpers');

// Middleware to parse query parameters
app.use(express.urlencoded({ extended: true }));

app.get('/mean', function (req, res, next) {
  try {
    if (!req.query.nums) {
      throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
    }

    const numsAsStrings = req.query.nums.split(',');
    const nums = convertAndValidateNumsArray(numsAsStrings);

    if (nums instanceof Error) {
      throw new ExpressError(nums.message, 400);
    }

    const result = {
      operation: "mean",
      result: findMean(nums)
    };

    console.log(`Mean calculation successful for nums: ${req.query.nums}`);
    return res.json(result);
  } catch (err) {
    return next(err);
  }
});

app.get('/median', function (req, res, next) {
  try {
    if (!req.query.nums) {
      throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
    }

    const numsAsStrings = req.query.nums.split(',');
    const nums = convertAndValidateNumsArray(numsAsStrings);

    if (nums instanceof Error) {
      throw new ExpressError(nums.message, 400);
    }

    const result = {
      operation: "median",
      result: findMedian(nums)
    };

    console.log(`Median calculation successful for nums: ${req.query.nums}`);
    return res.json(result);
  } catch (err) {
    return next(err);
  }
});

app.get('/mode', function (req, res, next) {
  try {
    if (!req.query.nums) {
      throw new ExpressError('You must pass a query key of nums with a comma-separated list of numbers.', 400);
    }

    const numsAsStrings = req.query.nums.split(',');
    const nums = convertAndValidateNumsArray(numsAsStrings);

    if (nums instanceof Error) {
      throw new ExpressError(nums.message, 400);
    }

    const result = {
      operation: "mode",
      result: findMode(nums)
    };

    console.log(`Mode calculation successful for nums: ${req.query.nums}`);
    return res.json(result);
  } catch (err) {
    return next(err);
  }
});

// General 404 error handler
app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

// General error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    error: err.message
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log(`Server starting on port ${PORT}`);
});

module.exports = app; // Export app for testing
