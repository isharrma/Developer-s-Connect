const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
var cors = require("cors");

const app = express();

//* Heroku line
// "heroku-postbuild":"NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"

// Connect Database
connectDB();
// app.get("/", (req, res) => res.send("API is running"));

// Init Middleware

app.use(express.json());

//Defining Routes
app.use(cors());
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));

Serve Static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
