"use strict";

var _ = require('lodash'),
	path = require('path'),
	AWS = require('aws-sdk'),
	Promise = require('bluebird'),
	fs = Promise.promisifyAll(require('fs')),
	StorageProvider = require('./base');

class StorageProviderS3 extends StorageProvider {

	/**
	 * Constructor
	 * @param  {object} appconfig Application Configuration
	 * @return {void}
	 */
	constructor(appconfig) {
		super(appconfig);
		this.s3 = null;
	}

	/**
	 * Establish connection to AWS S3
	 * @return {Promise} Promise
	 */
	connect() {
		this.s3 = new AWS.S3({
			accessKeyId: this.conf.s3.id,
			secretAccessKey: this.conf.s3.key,
			region: this.conf.s3.region,
			sslEnabled: true,
			logger: console
		});
		return Promise.resolve(true);
	}

	/**
	 * Create container (bucket) on AWS S3
	 * @param  {string} conName Name of the container
	 * @return {Promise}         Promise
	 */
	createContainer(conName) {
		let self = this;

		let buckConf = {
			Bucket: _.replace(conName, '{prefix}', self.conf.s3.bucket),
			ACL: 'private'
		};
		if(self.conf.s3.region !== 'us-east-1') {
			buckConf.CreateBucketConfiguration = {
				LocationConstraint: self.conf.s3.region
			};
		}

		return new Promise(function (resolve, reject) {
			return self.s3.createBucket(buckConf, function(err, data) {
				if(!err) {
					resolve(true);
				} else {
					reject(err);
				}
			});
		});
	}

}

module.exports = StorageProviderS3;