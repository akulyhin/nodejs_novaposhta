const {novaposhta} = require('../../../model');

const getCities = async (req, res) => {
    const {query} = req.body;
    
    const reg = new RegExp('^'+query+'','i');

    const cities = await novaposhta.Cities.find({DescriptionRu: { $regex: reg}}).limit(15).sort({DescriptionRu:1});

    res.json({
        status: "success",
        code: 200,
        data: cities
    })
}

module.exports = getCities;