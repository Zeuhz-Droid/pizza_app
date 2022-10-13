const { default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');
const passwordLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'A user must have a username'],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: 5,
    maxlength: 16,
  },
  user_type: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
