const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('dotenv').config();
const cron = require('./cron');

const {controllerWrapper, validation, authToken} = require('./middleware');
const novaposhtaRouter = require('./routes/npApi/novaposhta');
const apiNovaposhtaRouter = require('./routes/api/novaposhta');
const authRouter = require('./routes/auth');

const staticRouter = require('./routes/static');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
app.use(express.json())


// app.use('/', staticRouter);

const options = {
  index: 'login.html'
}

app.use(express.static("public", options));

app.use('/novaposhta', authToken(), express.static('public'));


app.use('/novaposhta', novaposhtaRouter);
app.use('/api/novaposhta', apiNovaposhtaRouter);
app.use('/auth', authRouter);

app.use((req, res) => {
    res.status(404).json({ message: 'Not found' })
  })
  
  app.use((err, req, res, next) => {
    const {status = 500, message = "Server error"} = err;
    res.status(status).json({ message })
  })

  
module.exports = app;