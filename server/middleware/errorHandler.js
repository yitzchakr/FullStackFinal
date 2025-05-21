const { ApiError } = require("../utils/apiError")

const errorHandler=(err, req, res, next) => {
    console.error(err.stack);
    err instanceof ApiError?
     res.status(err.code).send(err.message):
     res.status(500).send("Something went wrong!");
     
  }
  module.exports= errorHandler;