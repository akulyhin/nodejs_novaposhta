const {novaposhta} = require('../../../model');
const {NP_HOST, NP_API_KEY} = process.env;
const axios = require('axios');

const getAddress = async (req, res) => {
    const {Ref, query} = req.body
            
    const address = await axios.post(NP_HOST, {
        "modelName": "Address",
        "calledMethod": "getStreet",
        "methodProperties": {
            "CityRef": Ref,
            "FindByString": query
        },
        "apiKey": NP_API_KEY
        })
        .then(res => res.data.data)
        .catch(error => console.log(error))

    res.json({
        status: "success",
        code: 200,
        data: address
    })
}

module.exports = getAddress;