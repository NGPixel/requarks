"use strict";

var modb = require('mongoose');

var categorySchema = modb.Schema({

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
    type: String
  },
  icon: {
    type: String
  },
  defaultPriority: {
    type: String,
    enum: ['','low','normal','high']
  },

  // References

  defaultStatus: {
    type: String,
    ref: 'Status'
  },
  defaultType: {
    type: String,
    ref: 'Type'
  },
  statuses: [{
    type: String,
    ref: 'Status'
  }],
  types: [{
    type: String,
    ref: 'Type'
  }],

  // Sub-documents

  subCategories: [{
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    color: {
      type: String
    },
    sortIndex: {
      type: Number
    }
  }],
  infoBoxes: [{
    name: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    content: {
      type: String
    },
    icon: {
      type: String
    }
  }]

},
{
  timestamps: {}
});

module.exports = modb.model('Category', categorySchema);