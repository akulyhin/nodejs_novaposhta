const axios = require('axios');

const {novaposhta} = require('../../../model'); 

const {NP_HOST, NP_API_KEY} = process.env;

const getCities = async (req, res) => {
    const cities = await axios.post(NP_HOST, {
        "modelName": "Address",
        "calledMethod": "getCities",
        "methodProperties": {
        "FindByString": "",
        },
        "apiKey": NP_API_KEY
        })
        .then(res => res.data.data)
        .catch(err => console.log(err))

        const citiesArr = await novaposhta.Cities.find().count();

        if (citiesArr) {
            await novaposhta.Cities.deleteMany();
        }

        await novaposhta.Cities.create(cities);
        const CitiesCount = await novaposhta.Cities.find().count();
       
        res.json({
            status: "success",
            code: 200,
            data: {
                CitiesCount,
                message: "Cities successfully updated"
            }
        })
}


module.exports = getCities;