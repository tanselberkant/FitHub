const mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const ProgramSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  recommendedWeek: {
    type: Number,
  },
  contents: [
    {
      type: String,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  slug: {
    type: String,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
});

ProgramSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strich: true,
  });
  next();
});

const Program = mongoose.model('Program', ProgramSchema);
module.exports = Program;
