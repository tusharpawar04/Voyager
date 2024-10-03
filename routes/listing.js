const express = require('express');
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require('../models/listing.js');

const ListingController = require("../controllers/listings.js")
const {isLoggedIn,isOwner,validateListing,validateReview} = require("../middleware.js");
const multer  = require('multer')
const {storage}=require("../cloudConfig.js")

const upload = multer({storage});

 router.get("/home",ListingController.home);
 
router
.route("/")
//Index Route
.get(wrapAsync(ListingController.index))
// submitListing
.post(isLoggedIn,upload.single('listing[image]'),validateListing,wrapAsync(ListingController.submitListing)
);
//New route
router.get("/create",isLoggedIn,
ListingController.createListing);
//search
router.get('/search', async (req, res) => {
    const { query } = req.query;
  
    if (!query) {
      req.flash('error', 'Please enter a search term!');
      return res.redirect('/listings');
    }
  
    // Search by title or description, using regex for partial matches
    const listings = await Listing.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    });
  
    if (listings.length === 0) {
      req.flash('error', 'No listings match your search.');
      return res.redirect('/listings');
    }
  
    res.render('listings/searchResults', { listings, query });
  });
  

router.route("/:id")
//show route
.get(wrapAsync(ListingController.showListing)
)
//update route
.put(isLoggedIn,isOwner,upload.single('listing[image]'),validateListing,wrapAsync(ListingController.updateListing)
)
//delete route
.delete(isLoggedIn,isOwner,wrapAsync(ListingController.destroyListing)
)


//edit route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(ListingController.editListing)
);


module.exports = router;

 