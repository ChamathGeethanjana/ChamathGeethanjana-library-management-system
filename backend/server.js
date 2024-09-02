const express = require("express");
const db = require("./startup/database");
const routes = require("./routes/user");
require("dotenv").config();
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;
app.use(
  cors({
    origin: "*",
  })
); // Enable CORS for all routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database in index.js:", err);
    return;
  }
  console.log("Connected to the MySQL database in server.js.");
});
app.use(cors());
app.use(process.env.AUTHOR, routes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
