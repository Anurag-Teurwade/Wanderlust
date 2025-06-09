const Review = require("../models/review.js");
const Listing = require("../models/listing.js");

// Create a new review
module.exports.createReview = async (req, res) => {
  let listing = await Listing.findById(req.params.id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id;
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save({ validateModifiedOnly: true });

  req.flash("success", "New Review Created!");
  res.redirect(`/listings/${listing._id}`);
};

// Delete a review
module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;

  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);

  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
};

// Update a review (from inline form)
module.exports.updateReview = async (req, res) => {
  const { id, reviewId } = req.params;
  const updatedReview = req.body.review;

  await Review.findByIdAndUpdate(reviewId, updatedReview);

  req.flash("success", "Review updated successfully");
  res.redirect(`/listings/${id}`);
};
