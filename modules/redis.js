"use strict";

var Redis = require('ioredis'),
	_ = require('lodash');

/**
 * Redis module
 *
 * @param      {Object}  appconfig  Application config
 * @return     {Redis}   Redis instance
 */
module.exports = (appconfig) => {

	let conf = {};

	switch(appconfig.redis.config) {
		case 'noauth':
			conf = {
				port: appconfig.redis.port,
				host: appconfig.redis.host
			};
		break;
		case 'pwd':
			conf = {
				port: appconfig.redis.port,
				host: appconfig.redis.host,
				password: appconfig.redis.pass
			};
		break;
		case 'tls':
			conf = {
			  port: appconfig.redis.port,
			  host: appconfig.redis.host,
			  password: appconfig.redis.pass,
			  tls: {
			    servername: appconfig.redis.host
			  }
			};
		break;
		case 'socket':
			conf = {
				path: appconfig.redis.path
			};
		break;
	}

	let rd = new Redis(_.defaultsDeep(conf), {
		lazyConnect: false
	});

	// Handle connection errors

	rd.on('error', (err) => {
		winston.error('Failed to connect to Redis instance.');
	});

	return rd;

};