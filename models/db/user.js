"use strict";

var modb = require('mongoose');

var userSchema = modb.Schema({

  _id: String,

  // Fields

  username: {
    type: String,
    index: true
  },
  firstName: {
    type: String,
    index: true
  },
  lastName: {
    type: String,
    index: true
  },
  email: {
    type: String,
    index: true
  },
  jobTitle: {
    type: String
  },
  locale: {
    type: String
  },
  timezone: {
    type: String
  },
  isActive: {
    type: Boolean,
    default: false
  },
  isPending: {
    type: Boolean,
    default: true
  }
},
{
  timestamps: {}
});

userSchema.virtual('fullName').get(() => {
  return this.firstName + ' ' + this.lastName;
});

module.exports = modb.model('User', userSchema);