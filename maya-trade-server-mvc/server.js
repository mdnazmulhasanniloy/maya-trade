const mongoose = require("mongoose");
const colors = require("colors");
const app = require("./app");
const { port, db_url } = require("./config");
const ApiError = require("./errors/apiError");

//database connection

mongoose.connect(db_url).then(() => {
  console.log(`Database connection successful`.green.bold);
});

//server
const Port = port || 5000;




app.listen(port, () => {
  console.log(`App is running on prot ${Port}`.yellow.bold);
});
