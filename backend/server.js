const path = require("path");
const express = require("express");
const cors = require("cors");
const databaseConnection = require("./db/connection");
const postRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");
const app = express();
const port = process.env.PORT || 3000;
app.set("port", port);
app.use(cors());
app.use(express.static("images"));
app.use(express.json());
databaseConnection();
app.use(postRoutes);
app.use(userRoutes);
app.listen(port, () => {
  console.log(`Server is running on the ${port} port`);
});
