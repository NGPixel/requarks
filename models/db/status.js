"use strict";

var modb = require('mongoose');

var statusSchema = modb.Schema({

  _id: String,

  // Fields

  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  color: {
    type: String,
    required: true
  },
  sortIndex: {
    type: Number,
    default: 0,
    required: true
  },
  isClosed: {
    type: Boolean,
    default: false
  }

},
{
  timestamps: {}
});

module.exports = modb.model('Status', statusSchema);