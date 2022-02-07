const express = require('express');
const {apiNovaposhta:ctrl} = require('../../controllers');
const {controllerWrapper, authToken} = require('../../middleware');


const router = express.Router();

router.post('/getCities', controllerWrapper(ctrl.getCities));

router.post('/getWarehouses', controllerWrapper(ctrl.getWarehouses));

router.post('/getAddress', controllerWrapper(ctrl.getAddress))


module.exports = router;