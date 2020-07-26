const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');

class App {
  constructor() {
    this.express = express();

    this.middlewares();
    this.routes();
    // TODO errorManagement method
  }

  middlewares() {
    this.express.use(cors());
    this.express.use(helmet());
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    // TODO use a logger, like morgan, by Express
  }

  routes() {
    this.express.get('/', (req, res) => { res.send('var_dump($)') })
  }
}

module.exports = new App().express;
