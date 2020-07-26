const app = require('./app');
const config = require('./config');

const serverPort = config.port;

app.listen(serverPort || 3000);
