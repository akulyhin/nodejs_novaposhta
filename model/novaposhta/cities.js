const {Schema, model} = require('mongoose');

const citiesSchema = Schema({
    DescriptionRu: String,
    Ref: String,
    CityID: String,
    typeCityRu: String,
    SettlementTypeDescriptionRu: String,
    AreaDescriptionRu: String
})


const Cities = model('city', citiesSchema);

module.exports = Cities;