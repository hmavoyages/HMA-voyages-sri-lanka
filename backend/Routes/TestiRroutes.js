const express = require('express');
const router = express.Router();
const ctrl = require('../Controllers/TestiController');

// Define routes
router.post('/',  ctrl.createTestimonial);
router.get('/', ctrl.getAllTestimonials);
router.get('/featured/random', ctrl.getRandomFeatured);
router.get('/:id', ctrl.getTestimonialById);
router.put('/:id',  ctrl.updateTestimonial);
router.delete('/:id',  ctrl.deleteTestimonial);

module.exports = router;
