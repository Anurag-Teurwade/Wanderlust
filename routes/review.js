const express=require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/warpAsync.js");
const {validateReview,isLoggedIn,isReviewAuthor} = require("../middlewares/middlewareManager");
const reviewController = require("../controllers/reviews.js");

//Post Review Route
router.post("/",isLoggedIn, validateReview,wrapAsync(reviewController.createReview));

//Delete Review Route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports = router;

