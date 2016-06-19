"use strict";

var modb = require('mongoose');

var teamSchema = modb.Schema({

  _id: String,

  // Fields

  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },

  // References

  members: {
    type: String,
    ref: 'User'
  },
  projects: {
    type: modb.Schema.Types.ObjectId,
    ref: 'Project'
  }

},
{
  timestamps: {}
});

module.exports = modb.model('Team', teamSchema);