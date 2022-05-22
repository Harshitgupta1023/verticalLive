const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const authRoutes = require("./routers/auth");
const dataRoutes = require("./routers/data");
const dotenv = require("dotenv");

dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("", dataRoutes);
app.use("", authRoutes);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server up and running on port ${port}`);
});
