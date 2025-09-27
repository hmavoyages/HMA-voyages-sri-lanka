const express = require('express');
const router = express.Router();
const ctrl = require('../Controllers/tourPackageController');

// /packages
router.get('/', ctrl.list);
router.post('/', ctrl.create);

// /packages/:id  (id is tourId like T001)
router.get('/:id', ctrl.getById);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
