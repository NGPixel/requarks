"use strict";

var modb = require('mongoose');

var teamSchema = modb.Schema({

  _id: modb.Schema.Types.ObjectId,

  // Fields

  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    index: true
  },
  description: {
    type: String
  },
  memberCount: {
    type: Number,
    default: 0
  },

  // References

  members: [{
    type: modb.Schema.Types.ObjectId,
    ref: 'User'
  }],
  projects: [{
    type: modb.Schema.Types.ObjectId,
    ref: 'Project'
  }]

},
{
  timestamps: {}
});

module.exports = modb.model('Team', teamSchema);