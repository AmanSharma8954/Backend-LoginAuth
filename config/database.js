const mongoose = require("mongoose");

require("dotenv").config();

exports.connectDb = () => {
  mongoose
    .connect(
      process.env.DATABASE_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("DB CONNECTED SUCCESSFULLY");
    })
    .catch((err) => {
      console.log("DB Connection error");
      console.error(err);
      process.exit(1);
    });
};
