const mongoose = require("mongoose");


const connectToMongo = () => {
    console.log(process.env.DB_URI);
    mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    })
    .then(() => console.log("Conection Success"))
    .catch((err) => console.log(err));
  };
module.exports = connectToMongo;
  