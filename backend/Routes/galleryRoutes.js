const express = require('express');
const router = express.Router();
const ctrl = require('../Controllers/galleryController');

// /gallery
router.get('/', ctrl.list);
router.post('/', ctrl.create);

// /gallery/:id  (id is galleryId like G001)
router.get('/:id', ctrl.getById);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
