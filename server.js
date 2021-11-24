if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.DB_URL;

const corsOptions = {
  origin: "*",
  method: ["GET", "POST"],
};

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(DB_URL);
}

app.use(express.json());
app.use(cors(corsOptions));

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Greetings User!",
  });
});

app.use("/api", routes);

app.get("*", (req, res) => {
  res.send("404 | Page not found");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
