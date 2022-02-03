const express = require('express');
const axios = require('axios');

const router = express.Router();

const {NP_HOST, NP_API_KEY} = process.env;


router.get('/getCities', async (req, res) => {

    const cities = await axios.post(NP_HOST, {
        "modelName": "Address",
        "calledMethod": "getCities",
        "methodProperties": {
        "FindByString": "Київ"
        },
        "apiKey": NP_API_KEY
        }).then(data => data);

    res.json({
        status: "success",
        code: 200,
        data: cities
    })
})

module.exports = router;