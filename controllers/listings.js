
const Listing = require("../models/listing");
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  res.render("listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let response = await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
    .send();

  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = response.body.features[0].geometry;
  let savedListing = await newListing.save();
  console.log(savedListing);
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace(
    "/upload",
    "/upload/h_300,w_300,bo_5px_solid_lightblue"
  );
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (req.body.listing.location) {
    let response = await geocodingClient
      .forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
      .send();
    listing.geometry = response.body.features[0].geometry;
  }

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
  }
  await listing.save();

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};




module.exports.filter = async (req, res, next) => {
  let { id } = req.params;
  let allListings = await Listing.find({ category: { $all: [id] } });
  if (allListings.length != 0) {
    res.locals.success = `Listings Filtered by ${id}!`;
    res.render("listings/index.ejs", { allListings });
  } else {
    req.flash("error", `There is no any Listing for ${id}!`);
    res.redirect("/listings");
  }
};


//search logic 

module.exports.search = async (req, res) => {
  let input = req.query.q.trim().replace(/\s+/g, " ");
  
  if (!input || input === "") {
    req.flash("error", "Please enter search query!");
    return res.redirect("/listings");  // 🔁 Added 'return' here
  }

  // Capitalize the first letter of each word
  let data = input.split("");
  let element = "";
  let flag = false;

  for (let index = 0; index < data.length; index++) {
    if (index === 0 || flag) {
      element += data[index].toUpperCase();
    } else {
      element += data[index].toLowerCase();
    }
    flag = data[index] === " ";
  }

  // Search by title
  let allListings = await Listing.find({
    title: { $regex: element, $options: "i" },
  });

  if (allListings.length > 0) {
    res.locals.success = "Listings searched by Title!";
    return res.render("listings/index", { allListings });
  }

  // Search by category
  allListings = await Listing.find({
    category: { $regex: element, $options: "i" },
  }).sort({ _id: -1 });

  if (allListings.length > 0) {
    res.locals.success = "Listings searched by Category!";
    return res.render("listings/index", { allListings });
  }

  // Search by country
  allListings = await Listing.find({
    country: { $regex: element, $options: "i" },
  }).sort({ _id: -1 });

  if (allListings.length > 0) {
    res.locals.success = "Listings searched by Country!";
    return res.render("listings/index", { allListings });
  }

  // Search by location
  allListings = await Listing.find({
    location: { $regex: element, $options: "i" },
  }).sort({ _id: -1 });

  if (allListings.length > 0) {
    res.locals.success = "Listings searched by Location!";
    return res.render("listings/index", { allListings });
  }

  // Search by price if input is a number
  const intValue = parseInt(element, 10);
  const isNumeric = !isNaN(intValue);

  if (isNumeric) {
    allListings = await Listing.find({ price: { $lte: intValue } }).sort({ price: 1 });

    if (allListings.length > 0) {
      res.locals.success = `Listings searched by price less than ₹${intValue}!`;
      return res.render("listings/index", { allListings });
    }
  }

  // No results found
  req.flash("error", "No listings found based on your search!");
  return res.redirect("/listings");
};



module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};










