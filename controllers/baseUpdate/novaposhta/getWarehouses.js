const axios = require('axios');

const {novaposhta} = require('../../../model'); 

const {NP_HOST, NP_API_KEY} = process.env;

const getWarehouses = async (req, res) => {
    const warehouses = await axios.post(NP_HOST, {
        "modelName": "Address",
        "calledMethod": "getWarehouses",
        "methodProperties": {
            "FindByString": "",
        },
        "apiKey": NP_API_KEY
      }).then(res => res.data.data)
      .catch(err => console.log(err));

      let warehousesCount = await novaposhta.Warehouse.find().count();

      if (warehousesCount) {
          await novaposhta.Cities.deleteMany();
      }

      await novaposhta.Warehouse.create(warehouses);

      warehousesCount = await novaposhta.Warehouse.find().count();
      
      res.json({
          status: "success",
          code: 200,
          data: {
            warehousesCount,
            message: "Warehouses successfully updated"
          }
      })
}


module.exports = getWarehouses;