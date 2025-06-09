const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const {
  validateReview,
  isLoggedIn,
  isReviewAuthor,
} = require("../middlewares/middlewareManager");
const reviewController = require("../controllers/reviews.js");

// Post Review Route
router.post(
  "/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview)
);

// Edit Review Form Route (GET)
router.get(
  "/:reviewId/edit",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.renderEditForm)
);

// Update Review Route (PUT)
router.put(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  validateReview,
  wrapAsync(reviewController.updateReview)
);

// Delete Review Route
router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview)
);

module.exports = router;
