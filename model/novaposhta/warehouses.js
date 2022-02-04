const {Schema, model} = require('mongoose');

const warehousesSchema = Schema({
    DescriptionRu: String,
    ShortAddressRu: String,
    Ref: String,
    Number: String,
    CityRef: String,
    CityDescriptionRu: String,
    CategoryOfWarehouse: String,
    TypeOfWarehouse: String
})


const Warehouse = model('warehouse', warehousesSchema);

module.exports = Warehouse;