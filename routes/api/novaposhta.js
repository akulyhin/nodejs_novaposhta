const express = require('express');
const {apiNovaposhta:ctrl} = require('../../controllers');
const {controllerWrapper, authToken} = require('../../middleware');


const router = express.Router();

router.post('/getCities', authToken(), controllerWrapper(ctrl.getCities));

router.post('/getWarehouses', authToken(), controllerWrapper(ctrl.getWarehouses));

router.post('/getAddress', authToken(), controllerWrapper(ctrl.getAddress))


module.exports = router;