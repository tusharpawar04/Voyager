const express = require('express');
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const Review = require('../models/review.js');
const Listing = require('../models/listing.js');
const {isLoggedIn,isOwner,validateListing,validateReview,isReviewAuthor} = require("../middleware.js");
const { destroyReview,postReview } = require('../controllers/reviews.js');


//posting review route
router.post("/",isLoggedIn,validateReview,wrapAsync(postReview)
);
//delete review route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(destroyReview));
module.exports = router;