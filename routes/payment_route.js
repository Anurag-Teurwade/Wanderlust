// const express = require("express");
// const payment_route = express();

// // Middleware for parsing request bodies
// const bodyParser = require("body-parser");
// payment_route.use(bodyParser.json());
// payment_route.use(bodyParser.urlencoded({ extended: false }));

// // View engine setup (EJS)
// const path = require("path");
// payment_route.set("view engine", "ejs");
// payment_route.set("views", path.join(__dirname, "../views"));

// // Payment controller import
// const paymentController = require("../controllers/payment");

// // Routes
// payment_route.get("/", paymentController.renderProductPage);
// payment_route.post("/createOrder", paymentController.createOrder);

// module.exports = payment_route;
