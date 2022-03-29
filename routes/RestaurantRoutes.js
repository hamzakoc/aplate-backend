const express = require('express');
const bcrypt = require('bcryptjs');
const restaurantModel = require('../models/Restaurant');
const app = express();

//Read ALL
app.get('/api/restaurants', async (req, res) => {
  const restaurant = await restaurantModel.find({});


  try {
    res.send(restaurant);
  } catch (err) {
    res.status(500).send(err);
  }
});


app.post('/api/restaurants', async (req, res) => {

  const restaurant = new restaurantModel({

    username: req.body.username,
    password: req.body.password,
    fullName: req.body.fullName,
    address: req.body.address,
    city: req.body.city,
    phone: req.body.phone,
    emailId: req.body.emailId,
    about: req.body.about,
    logo: req.files.logo,
    photos: req.files.photos,
    photo2: req.files.photo2,
    photo3: req.files.photo3
  });

  try {
    await restaurant.save();
    res.send(restaurant);
    console.log("Name saved ++++++++++++++++++++++")
    console.log(logo.name)

  } catch (err) {
    res.status(500).send(err);
  }




});

//Get  by id
app.get('/api/restaurants/:id', async (req, res) => {
  const idfind = req.params.id
  console.log(idfind)

  const restaurant = await restaurantModel.findById(idfind);

  try {
    res.send(restaurant);
  } catch (err) {
    res.status(500).send(err);
  }
});







//Update Record
app.put('/api/restaurants/:id', (req, res) => {

  try {
    restaurantModel.findByIdAndUpdate(req.params.id, {
      $set: {
        username: req.body.username,
        password: req.body.password,
        fullName: req.body.fullName,
        address: req.body.address,
        city: req.body.city,
        phone: req.body.phone,
        emailId: req.body.emailId,
        about: req.body.about,
        logo: req.files.logo,
        photos: req.files.photos,
        photo2: req.files.photo2,
        photo3: req.files.photo3

      }
    },
      function (err, docs) {
        if (err) {
          console.log(err)
        }
        else {
          console.log("Updated User : ", docs)
        }
      }
    )

    restaurantModel.save()

    res.send(restaurant)

  } catch (err) {
    res.status(500).send(err)
  }



})




//Delete Record
app.delete('/api/restaurants/:id', async (req, res) => {
  try {
    const restaurant = await restaurantModel.findByIdAndDelete(req.params.id)

    if (!restaurant) res.status(404).send("No item found")
    res.status(200).send()
  } catch (err) {
    res.status(500).send(err)
  }
})



//Login 

app.post('/loginRestaurant', (req, res) => {

  restaurantModel.findOne({ username: req.body.username })
    .then(user => {
      console.log("User from login", user)
      if (!user) res.sendStatus(204);
      else {
        bcrypt.compare(req.body.password, user.password)
          .then(passwordMatch => passwordMatch ? res.sendStatus(200) : res.sendStatus(204))
      }
    });
});




module.exports = app