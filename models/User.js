const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const slugify = require('slugify');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['trainer', 'admin', 'client'],
    default: 'client',
  },
  height: {
    type: Number,
  },
  weight: {
    type: Number,
  },
  phone: {
    type: String,
  },
  healtProblem: {
    type: String,
  },
  slug: {
    type: String,
    unique: true,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  enrolledPrograms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Program',
    },
  ],
  proficiency: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Proficiency',
    },
  ]
});

UserSchema.pre('validate', function (next) {
  this.slug = slugify(this.name, {
    lower: true,
    strict: true,
  });
  next();
});

UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();
  if (!user.isModified('role')) return next();
  if (!user.isModified('proficiency')) return next();

  bcrypt.genSalt(10, function (err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
