const express = require('express');
const bodyParser = require('body-parser');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const http = require('http');
const helmet = require('helmet');
const path = require('path');
const routes = require('./routes/index');
const error = require('./middlewares/error');
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
const port = parseInt(config.port) || 3000;
/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

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
server.on('error', onError);
server.on('listening', onListening);

//mount document
app.use(express.static(path.join(__dirname, '/docs')));

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// mount routes
app.use('/', routes);


// catch 404 and forward to error handler
app.use(error.notFound);

// error handler, send stacktrace only during development
app.use(error.handler);

exports.core_service =  {app, server};
