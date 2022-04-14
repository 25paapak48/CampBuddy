const express = require('express');
// Express router seperates the params seperate. To prevent, set mergeParams : true
const router = express.Router({ mergeParams: true });

// Requiring review validation function
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware');

// Requiring models
const Campground = require('../models/campground');
const Review = require('../models/review');

// Rquiring review controller
const reviews = require('../controllers/reviews');

// Requiring Joi schema
const { reviewSchema } = require('../JoiSchemas');

// Requring ExpressError function
const ExpressError = require('../utils/ExpressError');
// Requiring async error catch function
const catchAsync = require('../utils/catchAsync');

router.post('/', validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;