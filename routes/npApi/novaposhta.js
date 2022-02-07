const express = require('express');

const {controllerWrapper} = require('../../middleware');
const {novaposhta:ctrl} = require('../../controllers');

const router = express.Router();



router.get('/getCities', controllerWrapper(ctrl.getCities));

router.get('/getWarehouses', controllerWrapper(ctrl.getWarehouses));



module.exports = router;