"use strict";

var modb = require('mongoose');

var fieldDefinitionSchema = modb.Schema({
  name: {
    type: String,
    required: true
  },
  format: {
    type: String,
    enum: ['text', 'int', 'choice'],
    default: 'text',
    required: true
  },
  prefix: {
    type: String
  },
  suffix: {
    type: String
  },
  sordIndex: {
    type: Number,
    required: true
  },
  isHalfSize: {
    type: Boolean,
    default: false,
    required: true
  },
  value: {
    type: String
  },
  defaultValue: {
    type: String
  },
  placeholder: {
    type: String
  },
  description: {
    type: String
  },
  icon: {
    type: String
  },
  validation: {
    type: String
  },
  isRequired: {
    type: Boolean,
    default: false,
    required: true
  },
  isRestricted: {
    type: Boolean,
    default: false,
    required: true
  },
  category: {
    type: modb.Schema.Types.ObjectId,
    ref: 'Category'
  },
  subCategory: {
    type: modb.Schema.Types.ObjectId,
    ref: 'SubCategory'
  }
},
{
  timestamps: {}
});

module.exports = modb.model('FieldDefinition', fieldDefinitionSchema);