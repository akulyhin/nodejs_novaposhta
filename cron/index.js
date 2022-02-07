const cron = require('node-cron');

const {novaposhta} = require('../controllers');

// *    *    *    *    *    *
// ┬    ┬    ┬    ┬    ┬    ┬
// │    │    │    │    │    │
// │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
// │    │    │    │    └───── month (1 - 12)
// │    │    │    └────────── day of month (1 - 31)
// │    │    └─────────────── hour (0 - 23)
// │    └──────────────────── minute (0 - 59)
// └───────────────────────── second (0 - 59, OPTIONAL)

const updateCities = cron.schedule('0 0 0 * * *', () => {
  console.log('Base is updated ' + new Date());
  novaposhta.getCities();
});

const updateWarehouses = cron.schedule('20 0 0 * * *', () => {
  console.log('Base is updated ' + new Date());
  novaposhta.getWarehouses();
})

module.exports = cron;