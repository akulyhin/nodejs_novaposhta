const {Schema, model} = require('mongoose');

const addressSchema = Schema({
    Description: String,
    StreetsType: String,
    Ref: String
})


const Address = model('Address', addressSchema);

module.exports = Address;