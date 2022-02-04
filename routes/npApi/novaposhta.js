const express = require('express');
const axios = require('axios');

const {novaposhta} = require('../../model'); 

const router = express.Router();

const {NP_HOST, NP_API_KEY} = process.env;


router.get('/getCities', async (req, res) => {

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


        await novaposhta.Cities.create(cities);

        res.json({
            status: "success",
            code: 200,
            data: cities
            
        })

})

router.get('/getWarehouses', async (req, res) => {
    const warehouses = await axios.post(NP_HOST, {
        "modelName": "Address",
        "calledMethod": "getWarehouses",
        "methodProperties": {
            "FindByString": "",
        },
        "apiKey": NP_API_KEY
      }).then(res => res.data.data)
      .catch(err => console.log(err));

      await novaposhta.Warehouse.create(warehouses);

      res.json({
          status: "success",
          code: 200,
          data: warehouses
      })
})



module.exports = router;