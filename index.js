const express = require("express");
const app = express();

require("dotenv").config();
const PORT = process.env.PORT || 1234;

app.use(express.json());

require("./config/database").connectDb();

// Route IMPORT AND MOUNT
const user = require("./routes/user");
app.use("/api/v1", user);

app.listen(1234, () => {
  console.log(`APP is listening at ${PORT}`);
});
