"use strict";

var modb = require('mongoose');

var projectSchema = modb.Schema({

  _id: String,

  // Fields

  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: true
  },

  // References

  owner: {
    type: Number,
    ref: 'User'
  },
  stakeholders: [{
    kind: String,
    item: {
      type: Number,
      ref: 'stakeholders.kind'
    }
  }],

  // Sprints

  sprints: [{
    iteration: {
      type: Number,
      required: true,
      min: 1
    },
    name: {
      type: String
    },
    startsOn: {
      type: Date
    },
    endsOn: {
      type: Date
    },
    requests: [{
      type: Number,
      ref: 'Request'
    }]
  }],

  // Documents

  documents: [{
    name: {
      type: String,
      required: true
    },
    fileType: {
      type: String,
      required: true,
      default: 'application/octet-stream'
    },
    parentFolder: {
      type: String,
      default: ''
    },
    isDeleted: {
      type: Boolean,
      default: false
    },
    author: {
      type: Number,
      ref: 'User',
      required: true
    }
  }],

  // Notes
  
  notes: [{
    name: {
      type: String,
      required: true
    },
    content: {
      type: String
    }
  }]

},
{
  timestamps: {}
});

module.exports = modb.model('Project', projectSchema);