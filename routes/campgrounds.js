const express = require('express');
const router = express.Router();
const multer  = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });

// Requiring campground model
const Campground = require('../models/campground');

// Requiring middlewares
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
// Requiring campground controllers
const campgrounds = require('../controllers/campgrounds');
// Requiring async error catch function
const catchAsync = require('../utils/catchAsync');

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));
    
router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;