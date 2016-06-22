"use strict";

var modb = require('mongoose');
require('mongoose-double')(modb);

var requestSchema = modb.Schema({

  _id: Number,

  summary: {
    type: String,
    required: true
  },
  planning: {
    effort: {
      type: modb.Schema.Types.Double,
      default: 0
    },
    progress: {
      type: Number,
      min: 0,
      max: 0,
      default: 0
    },
    scrumPoker: {
      type: modb.Schema.Types.Double,
      default: 0
    },
    deadline: {
      type: Date
    },
    deadlineInitial: {
      type: Date
    }
  },
  priority: {
    type: String,
    enum: ['', 'low', 'normal', 'high'],
    default: ''
  },

  // Activities

  activities: [{
    summary: {
      type: String,
      required: true
    },
    oldValue: {
      type: String
    },
    newValue: {
      type: String
    },
    author: {
      type: modb.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],

  // Comments

  comments: [{
    content: {
      type: String,
      required: true
    },
    author: {
      type: modb.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],

  // Descriptions

  descriptions: [{
    content: {
      type: String,
      required: true
    },
    author: {
      type: modb.Schema.Types.ObjectId,
      ref: 'User'
    }
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
      type: modb.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  }],

  // Custom Fields

  fields: [{
    value: {
      type: String
    },
    defintion: {
      type: modb.Schema.Types.ObjectId,
      ref: 'Field'
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
  }],

  // References

  category: {
    type: String,
    ref: 'Category',
    required: true
  },
  subCategory: {
    type: modb.Schema.Types.ObjectId,
    ref: 'SubCategory',
    required: true
  },
  status: {
    type: String,
    ref: 'Status',
    required: true
  },
  requestType: {
    type: String,
    ref: 'RequestType',
    required: true
  },
  parent: {
    type: Number,
    ref: 'Request',
    required: true
  },
  author: {
    type: modb.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  assignees: [{
    kind: String,
    item: {
      type: Number,
      ref: 'assignees.kind'
    }
  }],
  sprints: [{
    type: modb.Schema.Types.ObjectId,
    ref: 'Sprint'
  }],
  stakeholders: [{
    kind: String,
    item: {
      type: Number,
      ref: 'stakeholders.kind'
    }
  }],
  dependencies: [{
    type: Number,
    ref: 'Request'
  }]
},
{
  timestamps: {}
});

module.exports = modb.model('Request', requestSchema);