const mongoose = require("mongoose");
const validator = require("validator")

mongoose
  .connect("mongodb://localhost:27017/registerform", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
  })
  .then(() => console.log("Connection success.."))
  .catch((err) => console.log(err));