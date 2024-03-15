const mongoose = require("mongoose");

const connectToMongo = () => {
    mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Conection Success"))
    .catch((err) => console.log(err));
  };
module.exports = connectToMongo;
  