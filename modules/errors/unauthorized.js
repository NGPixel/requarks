"use strict";

/**
 * Unauthorized Error
 */
module.exports = class Unauthorized extends Error {
  constructor(msg) {
      super(msg);
      this.name = this.constructor.name;
		this.message = msg;
      Error.captureStackTrace(this, this.contructor);
  }
};