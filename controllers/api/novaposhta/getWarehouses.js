const {novaposhta} = require('../../../model');

const getWarehouses = async (req, res) => {
    
    const {Ref, query} = req.body;
    const [queryCity, queryNumer] = query.split(',');

    console.log(queryCity);
    console.log(queryNumer);

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const reg = new RegExp('^'+query+'','i');

    const warehouse = await novaposhta.Warehouse.find({CategoryOfWarehouse: {$ne: 'Postomat'}, $or: [{CityRef: Ref, Number: query}, {CityRef: Ref, ShortAddressRu: {$regex: capitalizeFirstLetter(query)}}]}).limit(5);

    res.json({
        status: "success",
        code: 200,
        data: warehouse
    })
}


module.exports = getWarehouses;