const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  bcrypt = require('bcrypt'),
  SALT_WORK_FACTOR = 10;

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const AdminSchema = new mongoose.Schema({

  username: {
    type: String,
    required: true,
    index: { unique: true },
    lowercase: true
  },

  password: { type: String, required: true },

  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },

  emailId: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },

  img: {
    data: Buffer,
    contentType: String
  },

  role: {
    type: String,
    default: "user",
    enum: ['user', 'admin', 'moderator', 'deactive', 'active'],
  },

  reviews: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
  },

  events: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }]
  }



});


AdminSchema.pre('save', function (next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);
      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});


AdminSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const Admin = mongoose.model("Admin", AdminSchema);
module.exports = Admin;