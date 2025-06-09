const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String,
  },
  price: Number,
  location: String,
  country: String,
  category: {
    type: [String], // changed from String to array of strings
    required: true,
    enum: [
      "Trending",
      "Beachfront",
      "Farms",
      "OMG",
      "Lake",
      "Design",
      "Pools",
      "City",
      "Rooms",
      "Lakefront",
      "Tiny",
      "Countryside",
      "Cabins",
      "Treehouse",
      "Tropical",
      "Parks",
      "Castles",
      "Camping",
      "World",
      "Luxe",
    ],
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
});

// Middleware to delete reviews when listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
