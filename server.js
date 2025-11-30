const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 8000;

app.get(["/", "/index", "index.html"], (req, res) => {
  //   res.sendFile("./views/index.html", { root: __dirname }); //alternate for path.join
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
app.get("/new-page.html", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});
app.get("/old-page.html", (req, res) => {
  //-----------> Redirect your path from an old page
  res.redirect(301, "/new-page.html");
});

//=====================================Route Handlers===========================//
app.get(
  ["/hello.html", "/hello"],
  (req, res, next) => {
    console.log("attempted to load hello.html");
    next(); //calls the next function
  },
  (req, res) => {
    res.send("hello world");
  }
);
//=====================================Default======================================//
app.get(/.*/, (req, res) => {
  //regex version to take care of all other paths
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
