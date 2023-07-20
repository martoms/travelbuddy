require('dotenv').config();

// Require directives
const express = require('express');
const cors = require('cors');
const {connect} = require('mongoose');
const homeRoute = require('./routes/homeRoute');
const destinationRoute = require('./routes/destinationRoute');
const bookingRoute = require('./routes/bookingRoute');
const userRoute = require('./routes/userRoute');
const { pageNotFound } = require('./middlewares/pageNotFound');
const cookieParser = require('cookie-parser');

// express app
const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors());


// connect to db
connect(process.env.MONGO_URI,
    {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
).then(() => {
    console.log('connected to database')

    // listen to port
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Now listening to port, ${process.env.PORT || 5000}!`)
    })

}).catch((err) => {
  console.log(`Error message: ${err.message}`);
  console.log(`Location: ${err.stack}`);
})


// Route Middlewares
app.use(homeRoute);
app.use(destinationRoute);
app.use('/bookings', bookingRoute);
app.use('/users', userRoute);
app.use(pageNotFound);
