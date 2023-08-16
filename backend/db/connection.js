const mongoose = require("mongoose");
function databaseConnection() {
  mongoose
    .connect("mongodb://127.0.0.1:27017/mean-stack")
    .then(() => {
      console.log("Database connected succesfully");
    })
    .catch((err) => {
      console.log("Not connected successfully");
    });
}
module.exports = databaseConnection;
