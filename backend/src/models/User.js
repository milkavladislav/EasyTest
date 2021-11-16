const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  passedTests: [
    {
      test: {
        type: Schema.Types.ObjectId,
        ref: 'tests',
      },
      name: {
        type: String,
      },
      evolution: {
        type: Number,
      },
      date: {
        type: Date,
        default: Date.now,
      }
    }
  ],
  tests: [
    {
      test: {
        type: Schema.Types.ObjectId,
        ref: 'tests',
      },
      name: {
        type: String,
      },
      description: {
        type: String,
      },
    }
  ]
});

module.exports = User = mongoose.model('users', UserSchema);
