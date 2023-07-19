const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
app.set("port", port);
app.use(cors());
app.use(express.json());
app.listen(port, () => {
  console.log(`Server is running on the ${port} port`);
});
