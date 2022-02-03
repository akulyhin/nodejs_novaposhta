const express = require('express');
const {novaposhta} = require('../../model');

const router = express.Router();

router.post('/getCities', async (req, res) => {
    const {query} = req.body;

    const reg = new RegExp(`/^${query}/i`);
    const cities = await novaposhta.Cities.find({DescriptionRu: { $regex: query}}).limit(5).sort({DescriptionRu:1});

    res.json({
        status: "success",
        code: 200,
        data: cities
    })
})


router.post('/getWarehouses', async (req, res) => {
    const {Ref, query} = req.body;

    const warehouse = await novaposhta.Warehouse.find({CityRef: Ref, Number: query});

    res.json({
        status: "success",
        code: 200,
        data: warehouse
    })
})


module.exports = router;