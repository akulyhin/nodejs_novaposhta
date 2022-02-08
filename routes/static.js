const express = require('express');
const path = require('path');

const {controllerWrapper, validation, authToken} = require('../middleware');


const router = express.Router();

const public = path.join(__dirname, '../public');
console.log(public);

router.get('/', async (req, res) => {
    res.sendFile(path.join(public, 'index.html'));


})




module.exports = router;