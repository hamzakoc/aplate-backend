const mongoose = require('mongoose')


const ReviewSchema = new mongoose.Schema({

  comment: {
    type: String,
    required: 'Can not be empty',
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Admin"
  }

},

  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }

);



const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;