"use strict";

var Redis = require('ioredis'),
	_ = require('lodash');

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

	return new Redis(_.defaultsDeep(conf), {
		lazyConnect: false
	});

};