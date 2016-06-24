var  chai = require('chai'),
	  chaiAsPromised = require("chai-as-promised"),
	  expect = chai.expect;

chai.use(chaiAsPromised);

describe('setup-db', function () {

	describe('mongodb', function () {

		global.db = require('../modules/db')(appconfig);

		it('must connect', function() {

			return expect(db.connectPromise).to.be.fulfilled;

		});

		it('must retrieve next request ID', function() {
			
			return expect(db.common.fetchLatestIncrements(true)).to.be.fulfilled;

		});

	});

});