const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");

const logger = require("./middlewares/logger");
const users = require("./Users");

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Homepage Route
app.get("/", (req, res) => {
  res.render("index", {
    title: "User App",
    users,
  });
});

// Set Static folder(static server)
app.use(express.static(path.join(__dirname, "public")));
// Handlebars Middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// app.use(logger);

// app.get("/", (req, res) => {
//   res.send("<h1>Hello World!!!!</h1>");
// });

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// Users api Routes
app.use("/api/users", require("./routes/api/users"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
