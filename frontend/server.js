const express = require('express');
const cookieParser = require('cookie-parser');
const next = require('next');
const proxy = require('http-proxy-middleware');
const Configs = require('./src/config/index');
const routes = require('./src/routes');

const port = parseInt(process.env.PORT, 10) || 4000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({dir: `./src`, dev});
const handle = routes.getRequestHandler(app);

// Handle Login


app.prepare().then(() => {
	const server = express();
	server.use(cookieParser());
	server.use('/api', proxy({target: dev ? Configs.api_dev : Configs.api_prod, changeOrigin: true, logLevel: 'debug'}));
	server.use(handle);
	server.listen(port, (err) => {
		if (err) throw err;
		console.log(`> Ready on http://localhost:${port}`)
	})
});
