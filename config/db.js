const mongoose = require("mongoose");

const connect = async () => {
  return await mongoose.connect(process.env.mongoDB);
};

module.exports = connect;
