const express = require('express');
const passport = require('passport');
const bcrypt = require('bcryptjs');

const adminModel = require('../models/Admin');
const eventModel = require('../models/Event');
const reviewModel = require('../models/Review');

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

//Get reviews
app.get('/api/admins/reviews', async (req, res) => {
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


//Get admin by id
app.get('/api/admins/:id', async (req, res) => {
  const idfind = req.params.id
  console.log(idfind)

  const admins = await adminModel.findById(idfind);

  try {
    res.send(admins);
  } catch (err) {
    res.status(500).send(err);
  }
});


//Update Record
app.put('/api/admins/:id', async (req, res) => {
  try {
    await adminModel.findByIdAndUpdate(req.params.id, req.body)
    await adminModel.save()
    res.send(admin)
    console.log("pringterd")
  } catch (err) {
    res.status(500).send(err)
  }
})




//Delete Record
//localhost:8081/admin/5d1f6c3e4b0b88fb1d257237
app.delete('/api/admins/:id', async (req, res) => {
  try {
    const admin = await adminModel.findByIdAndDelete(req.params.id)

    if (!admin) res.status(404).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
})



//Login 

app.post('/login', (req, res) => {

  adminModel.findOne({ username: req.body.username })
    .then(user => {
      console.log("User from login", user)
      if (!user) res.sendStatus(204);
      else {
        bcrypt.compare(req.body.password, user.password)
          .then(passwordMatch => passwordMatch ? res.sendStatus(200) : res.sendStatus(204))
      }
    });
});

app.post('/validate', (req, res) => {

  adminModel.findOne({ username: req.body.username })
    .then(user => user ? res.sendStatus(204) : res.sendStatus(200))
});




module.exports = app