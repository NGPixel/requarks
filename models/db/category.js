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
    id: {
      type: modb.Schema.Types.ObjectId,
      required: true,
      index: true
    },
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
  fields: [{
    id: {
      type: modb.Schema.Types.ObjectId,
      required: true,
      index: true
    },
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
    subCategory: {
      type: modb.Schema.Types.ObjectId
    }
  }],
  infoBoxes: [{
    id: {
      type: modb.Schema.Types.ObjectId,
      required: true,
      index: true
    },
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