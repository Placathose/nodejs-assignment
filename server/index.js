const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

// load env variables
dotenv.config();
const db = require("../components/artist/model");
const { request } = require("http");

// set uo app & port
const app = express();
const port = process.env.PORT || "8888";

// set path to /views folder
app.set("views", path.join(__dirname, "views"));
// set pug as the express app's template engine
app.set("view engine", "pug");

// use "public" folder for static files 
app.use(express.static(path.join(__dirname, "public")));

// use both urlencoded & json
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// use pages routes from routers
app.use("/", require("../components/artist/routes"));
// app.use("/user", require("./components/user/routes"));




// set server to listen
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
})









