const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require('./Routes/userRoutes');
const User = require("./Models/userModel");
const app = express();
const PORT = process.env.PORT || 5000
require('dotenv').config();
app.use('/sources', express.static(__dirname + '/sources'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use("/user", userRoutes);
mongoose
  .connect("mongodb://0.0.0.0:27017/twitter", { useNewUrlParser: true })
  .then(() => {
    console.log("db connected");
  });




// mongoose.set("strictQuery", false);
// mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true, })
//   .then((err) => { console.log("connected") })


app.listen(PORT, function () {
  console.log("app running on 5000");
});
