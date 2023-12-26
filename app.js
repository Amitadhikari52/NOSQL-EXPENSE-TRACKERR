const express = require('express');
const cors = require('cors');
const bodyparser = require('body-parser');
const connectToMongoDB = require('./util/database');
//expenseDetails: This is a middleware function that you have defined in another file (probably ./routes/addexpense)
// Middleware functions are often used to handle specific aspects of the request-response cycle, such as route handling, authentication, error handling, etc.
const expenseDetails = require('./routes/addexpense');
const signupORDetails = require('./routes/signupORlogin');
const purchasePremium = require('./routes/purchase-mebership');
const premium_leaderBoard = require('./routes/premium');
const password = require('./routes/forgotpassword');
const helmet = require('helmet'); //it will provide essential http headers
const compression = require('compression'); //it used to reduce the size of an front end files such as expense.js,css etc
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

require("dotenv").config(); // Load environment variables from .env file

// creating an instance of an Express application
const app = express();

app.use(cors());
app.use(bodyparser.json());
// app.use(helmet());
app.use(compression());
const accessLogStream = fs.createWriteStream(path.join(__dirname,"request.log"),{flags:"a"})
//morgan package is used to log http request and we are creating file called "request.log" in order to store the http request
app.use(morgan('combined', {stream:accessLogStream}));


// you are adding a middleware function named expenseDetails to your Express application's middleware stack
//app.use() will be executed for every incoming request.
app.use(expenseDetails);
app.use(signupORDetails);
app.use(purchasePremium);
app.use(premium_leaderBoard);
app.use(password);

// Serve signup page
app.get('/signup',(req,res)=>{
  res.sendFile(path.join(__dirname,'views','signup.html'))
});

// Serve main dashboard page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'dashboard.html'));
});


// Serve static files from the 'views' directory
app.use(express.static(path.join(__dirname, 'views')));

connectToMongoDB() // Call the function to connect to MongoDB
  .then(() => {
    console.log('Database is connected to MongoDB');
    app.listen(3000, () => {
      console.log('Listening on port 3000');
    });
  })
  .catch((err) => console.log(err));
