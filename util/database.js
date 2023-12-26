const mongoose = require('mongoose');
require('dotenv').config();

async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.DB_HOST, {
      dbName: process.env.DB_DATABASE,
      user: process.env.DB_USERNAME,
      pass: process.env.DB_PASSWORD,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(`MongoDB connection error: ${error}`);
    throw error;
  }
}

module.exports = connectToMongoDB;


// const mongoose = require('mongoose');
// const mongodb = async function main() {
//   await mongoose.connect("mongodb://127.0.0.1:27017/test"); //27017 default port number and test is default database name
// };
// module.exports = mongodb;