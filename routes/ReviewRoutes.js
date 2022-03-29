const express = require('express');

const reviewModel = require('../models/Review');
const app = express();

//Read ALL
app.get('/api/reviews', async (req, res) => {
  const review = await reviewModel.find({});


  try {
    res.send(review);
  } catch (err) {
    res.status(500).send(err);
  }
});

//Create new
app.post('/api/reviews', async (req, res) => {
  const review = new reviewModel(req.body);

  try {
    await review.save();
    res.send(review);
  } catch (err) {
    res.status(500).send(err);
  }
});


//Get by id
app.get('/api/reviews/:id', async (req, res) => {
  const idfind = req.params.id
  console.log(idfind)

  const review = await reviewModel.findById(idfind);

  try {
    res.send(review);
  } catch (err) {
    res.status(500).send(err);
  }
});


//Update Record
app.put('/api/reviews/:id', async (req, res) => {
  try {
    await reviewModel.findByIdAndUpdate(req.params.id, req.body)
    await reviewModel.save()
    res.send(review)
  } catch (err) {
    res.status(500).send(err)
  }
})




//Delete Record
//localhost:8081/user/5d1f6c3e4b0b88fb1d257237

app.delete('/api/reviews/:id', async (req, res) => {
  try {
    const review = await reviewModel.findByIdAndDelete(req.params.id)

    if (!review) res.status(404).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
})

module.exports = app