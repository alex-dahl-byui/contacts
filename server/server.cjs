const express = require("express");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const messageRoutes = require("./routes/messageRoutes.cjs");
const contactRoutes = require("./routes/contactRoutes.cjs");
const documentRoutes = require("./routes/documentRoutes.cjs");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(cookieParser());

app.use(logger("dev")); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  );
  next();
});

// Serve static files from the Vite build directory
app.use(express.static(path.join(__dirname, "../dist")));

// Handle any other routes (e.g., for a single-page app)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist", "index.html"));
});

// REST endpoints
app.use("/messages", messageRoutes);
app.use("/documents", documentRoutes);
app.use("/contacts", contactRoutes);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
