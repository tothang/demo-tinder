const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const routes = require('./routes/index');
const config = require('./config');

require('./database');
/**
 * Express instance
 * @public
 */
const app = express();
const server = http.createServer(app);
// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 1000000 }));
const port = parseInt(config.port) || 5000;


/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;
    console.log(`Listening on ${bind} and service started`);
}

app.set('port', port);
server.listen(port);
server.on('listening', onListening);

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount routes
app.use('/', routes);


exports.core_service =  {app, server};
