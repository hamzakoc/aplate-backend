const express = require('express');

const subscriberModel = require('../models/Subscriber');

const app = express();



//Read ALL
app.get('/api/admins', async (req, res) => {
  const admins = await adminModel.find({});
  try {
    res.send(admins);
  } catch (err) {
    res.status(500).send(err);
  }
});



app.post('/validateUserName', async (req, res) => {
  adminModel.findOne({ username: req.body.username })
    .then(user => user ? res.sendStatus(204) : res.sendStatus(200))
});


app.post('/api/admins', async (req, res) => {


  let admin = new adminModel(req.body);
  console.log(req.body)
  admin.save()
    .then(reg => {
      res.sendStatus(200);
    })
    .catch(err => {
      res.status(400).send("Failed to store to database");
    });
});



app.post('/validateSubscriber', (req, res) => {
  adminModel.findOne({ username: req.body.username })
    .then(user => user ? res.sendStatus(204) : res.sendStatus(200))
});




module.exports = app