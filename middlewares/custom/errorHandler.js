const ExpressError = require("../../utils/ExpressError");

const errorHandler = (err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    res.status(statusCode).render("errors/error", { err });
};

module.exports = errorHandler;
