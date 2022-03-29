const mongoose = require('mongoose');


const EventSchema = new mongoose.Schema({

  eventName: {
    type: String,

    trim: true,
    lowercase: true,
  },
  eventDate: {
    type: Date
  },

  city: {
    type: String
  },

  seat: {
    type: String
  },

  desciription: {
    type: String
  },

  foodOption: {
    type: String
  },

  restaurant: {
    type: String
  },

  restaurantId: {
    type: String
  },


  eventPhoto: {
    data: Buffer,
    contentType: String
  },

  optionalImage: {
    data: Buffer,
    contentType: String
  },

  registeredUser: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin"
    }
  ],

  reviews: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }]
  }

},

  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }

);

const Event = mongoose.model("Event", EventSchema);
module.exports = Event;