const express = require('express');
const eventModel = require('../models/Event');
const reviewModel = require('../models/Review');
const adminModel = require('../models/Admin');


const app = express();


//Read ALL
app.get('/api/events', async (req, res) => {
  const events = await eventModel.find({});


  try {
    // events.eventPhoto = new Buffer.from(bitMap, "base64")
    res.send(events);
  } catch (err) {
    res.status(500).send(err);
  }
});


app.post('/api/events', (req, res) => {

  const event = new eventModel({

    eventName: req.body.eventName,
    eventDate: req.body.eventDate,
    city: req.body.city,
    seat: req.body.seat,
    desciription: req.body.desciription,
    foodOption: req.body.foodOption,
    restaurant: req.body.restaurant,
    restaurantId: req.body.restaurantId,
    eventPhoto: req.files.eventPhoto,
    optionalImage: req.files.optionalImage
  });

  try {
    event.save();
    res.send(event);
    console.log("Name saved ++++++++++++++++++++++")
    console.log(eventPhoto.name)

  } catch (err) {
    res.status(500).send(err);
  }

});


//Get event by id
app.get('/api/events/:id', async (req, res) => {
  const idfind = req.params.id
  console.log(idfind)

  const events = await eventModel.findById(idfind).populate('reviews').exec()

  try {
    res.send(events);
  } catch (err) {
    res.status(500).send(err);
  }
});


//Get restaurant events
app.get('/api/events/createdbyrest/:id', async (req, res) => {
  const idfind = req.params.id
  console.log(idfind)

  const events = await eventModel.find({ restaurantId: idfind })

  try {
    res.send(events);
  } catch (err) {
    res.status(500).send(err);
  }
});


//Get restaurant events guests
app.get('/api/events/guests/:id', async (req, res) => {
  const idfind = req.params.id
  console.log(idfind)

  const events = await eventModel.find({ restaurantId: idfind }).populate('registeredUser').exec()

  try {
    res.send(events);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Get restaurants' review given by users
app.get('/api/events/reviewsforrest/:id', async (req, res) => {
  const idfind = req.params.id
  console.log(idfind)


  const events = await eventModel.find({ restaurantId: idfind }).populate('reviews').exec()

  try {
    res.send(events);
  } catch (err) {
    res.status(500).send(err);
  }
});

//////////////////////////////USER REQUEST START///////////////////

//Get restaurants' review given by users
app.get('/api/events/registeredevents/:id', async (req, res) => {
  const idfind = req.params.id
  console.log(idfind)

  const events = await eventModel.find({ registeredUser: idfind }).populate('registeredUser').exec()

  try {
    res.send(events);
  } catch (err) {
    res.status(500).send(err);
  }
});


//Get restaurants' review given by users
app.get('/api/events/givenreviews/:id', async (req, res) => {
  const idfind = req.params.id
  console.log(idfind)
  console.log("from db given reviews")

  const events = await eventModel.find({}) 
  .populate({ 
    path: 'reviews',
    populate: {
      path: 'user',
      model: 'Admin'
    } 
 }).exec()


  try {

    res.send(events);
  } catch (err) {
    res.status(500).send(err);
  }
});
//////////////////////////////USER REQUEST END///////////////////



//Update Record
app.put('/api/events/:id', (req, res) => {

  const event = new eventModel({

    eventName: req.body.eventName,
    eventDate: req.body.eventDate,
    city: req.body.city,
    seat: req.body.seat,
    desciription: req.body.desciription,
    foodOption: req.body.foodOption,
    restaurant: req.body.restaurant,
    restaurantId: req.body.restaurantId,
    eventPhoto: req.files.eventPhoto,
    optionalImage: req.files.optionalImage
  });


  try {
    eventModel.findByIdAndUpdate(req.params.id, event)
    eventModel.save()
    res.send(event)
  } catch (err) {
    res.status(500).send(err)
  }


})


///

app.post('/api/events/register', (req, res) => {
  var userId = req.body.userId
  var eventId = req.body.eventId
  try {
    eventModel.findByIdAndUpdate(
      eventId,
      {
        "$addToSet": { "registeredUser": userId },
      },
      { "new": true, "upsert": true }
    ).exec();



    adminModel.findByIdAndUpdate(
      userId,
      {
        "$addToSet": { "events": eventId },
      },
      { "new": true, "upsert": true }
    ).exec();

    res.status(200).send()
    console.log("okay")
  } catch (err) {
    res.status(500).send(err)
  }

})


app.post('/api/events/comment', function (req, res) {
  var eventId = req.body.eventId;
  var userId = req.body.userId;
  var comment = req.body.comment;

  console.log(req.params + "body")

  var newComment = new reviewModel({
    comment: comment,
    user: userId
  });

  console.log(userId + " User ID")
  console.log(eventId + " Event ID")
  console.log(comment + " Comment ID")

  newComment.save().then(function (comment) {


    eventModel.findByIdAndUpdate(
      eventId,
      {
        "$push": { "reviews": comment._id },
      },
      { "new": true, "upsert": true }
    ).exec();



    adminModel.findByIdAndUpdate(
      userId,
      {
        "$push": { "reviews": comment._id },
      },
      { "new": true, "upsert": true }
    ).exec();


  })
    .then(function (rewiews) { res.send(rewiews); })
    .catch(function (err) { throw err; });
});



//Delete Record
//localhost:8081/event/5d1f6c3e4b0b88fb1d257237
app.delete('/api/events/:id', async (req, res) => {
  try {
    const event = await eventModel.findByIdAndDelete(req.params.id)

    if (!event) res.status(404).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = app