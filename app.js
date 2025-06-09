if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const flash = require("connect-flash");
const session = require("express-session");
const passport = require("passport");

const connectDB = require("./config/db");
const sessionOptions = require("./config/session");
const ExpressError = require("./utils/ExpressError");
const errorHandler = require("./middlewares/custom/errorHandler");
const { isAuthenticated } = require("./middlewares/custom/isAuthenticated");

// Models
const User = require("./models/user");

// Passport Configurations (OAuth + local strategies)
require("./config/passport");

// Routes
const listingRouter = require("./routes/listing");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");

const app = express();

// Connect to MongoDB
connectDB();

// View Engine Setup
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));
app.use(session(sessionOptions));
app.use(flash());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Flash + current user to all views
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Routes
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);
app.use("/auth", authRouter); // Google/GitHub OAuth routes

// Home Route
app.get("/", (req, res) => {
  res.redirect("/listings");
});

// 404 Error Handler
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

// Global Error Handler
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
