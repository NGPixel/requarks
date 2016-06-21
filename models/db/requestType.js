"use strict";

var modb = require('mongoose');

var requestTypeSchema = modb.Schema({

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
  icon: {
    type: String,
    required: true
  },
  isSystem: {
    type: Boolean,
    default: false
  },

  // References
  
  parent: {
    type: String,
    ref: "Type"
  }

},
{
  timestamps: {}
});

module.exports = modb.model('RequestType', requestTypeSchema);