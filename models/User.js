const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
      default: null,
    },
    password: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    passwordResetToken: {
      type: String,
      default: null,
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      },
    ],
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

UserSchema.pre('save', async function saves(next) {
  const user = this;

  try {
    /** Only hash the password if it has been modified (or is new) */
    if (!user.isModified('password')) return next();
    /** Generate Salt */
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    /** Hash the password using our new salt */
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.validatePassword = async function validate(candidatePassword) {
  const match = await bcrypt.compare(candidatePassword, this.password);
  return match;
};

module.exports = mongoose.model('User', UserSchema);
