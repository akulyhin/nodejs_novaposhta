const express = require('express');
const {novaposhta} = require('../../model');

const router = express.Router();

router.post('/getCities', async (req, res) => {
    const {query} = req.body;

    
    const reg = new RegExp('^'+query+'','i');
    // /^Киев/i

    const cities = await novaposhta.Cities.find({DescriptionRu: { $regex: reg}}).limit(5).sort({DescriptionRu:1});

    res.json({
        status: "success",
        code: 200,
        data: cities
    })
})


router.post('/getWarehouses', async (req, res) => {
    const {Ref, query} = req.body;

    const reg = new RegExp('^'+query+'','i');

    const warehouse = await novaposhta.Warehouse.find({CategoryOfWarehouse: {$ne: 'Postomat'}, $or: [{CityRef: Ref, Number: query}, {CityRef: Ref, ShortAddressRu: {$regex: query}}]}).limit(5);

    res.json({
        status: "success",
        code: 200,
        data: warehouse
    })
})


module.exports = router;