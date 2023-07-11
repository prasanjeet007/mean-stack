const express = require("express");
const app = express();
const PORT = 3000;
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server is running on the ${process.env.PORT || PORT} port`);
});
