'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _next = require('next');

var _next2 = _interopRequireDefault(_next);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PORT = process.env.PORT || 3000;
var dev = process.env.NODE_ENV !== 'production';

var app = (0, _next2.default)({ dev: dev });
var handle = app.getRequestHandler();

app.prepare().then(function () {
	var server = (0, _express2.default)();
	var showRoutes = require('./routes/index.js');

	server.use('/api', showRoutes);
	server.get('*', function (req, res) {
		return handle(req, res);
	});

	server.listen(PORT, function (err) {
		if (err) throw err;
		console.log('> Ready on ' + PORT);
	});
}).catch(function (ex) {
	console.error(ex.stack);
	process.exit(1);
});