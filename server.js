const express = require('express');
const mongoose = require('mongoose');

const restaurantRouter = require('./routes/RestaurantRoutes.js');
const reviewRouter = require('./routes/ReviewRoutes.js');
const eventRouter = require('./routes/EventRoutes.js');
const adminRouter = require('./routes/AdminRoutes.js');
const auth = require('./routes/Auth.js');

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
var cors = require('cors')



const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(bodyParser.json());
app.use(cookieParser());

app.use(cors())


mongoose.connect('mongodb+srv://admin:abcd1234@cluster0.tdi55.mongodb.net/aplate',
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });


app.use(restaurantRouter);
app.use(reviewRouter);
app.use(eventRouter);
app.use(adminRouter);
app.use(auth);



const port = process.env.PORT || 5000
app.listen(port, () => { console.log(`Server is running http://localhost:${port}/`) })