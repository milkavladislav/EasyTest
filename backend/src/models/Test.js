const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TestSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  questions: [
    {
      text: {
        type: String,
      },
      answers: [
        {
          text: {
            type: String,
          },
          isRight: {
            type: Boolean,
          },
        },
      ],
    },
  ],
  passedTest: [
    {
      user: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
        required: true,
      },
      evolution: {
        type: Number,
      },
    },
  ],
  setting: {},
});

module.exports = Test = mongoose.model("tests", TestSchema);
