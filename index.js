const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
const data = require("./data.json");
let bigImg = require("./bigImg.json");

const port = 3000;

// console.log(data);
// Need of variable
let arr = [];

app.get("/", (req, res) => {
  //   res.send('Hello World!');
  // console.log(data)
  let num = 0;
  res.render("home", { data, bigImg, num });
});
app.get("/home", (req, res) => {
  //   res.send('Hello World!');
  // console.log(bigImg[0]);
  let num = 0;
  res.redirect("/");
});

app.get("/page/:num", (req, res) => {
  let { num } = req.params;
  num = parseInt(num);
  if (num == 0) {
    res.redirect("/");
  } else {
    res.render("home", { num, data, bigImg });
  }
});

//FIXME:
app.get("/category/:sub", (req, res) => {
  let { sub } = req.params;
  arr = [];

  if (sub == "web") {
    arr = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].type == "Web") {
        arr.push(data[i]);
      } else if (data[i].type == "web") {
        arr.push(data[i]);
      }
    }
  }

  if (sub == "bollywood") {
    arr = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].type == "bollywood") {
        arr.push(data[i]);
      } else if (data[i].type == "Bollywood") {
        arr.push(data[i]);
      }
    }
  }
  if (sub == "hollywood") {
    arr = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].type == "hollywood") {
        arr.push(data[i]);
      } else if (data[i].type == "Hollywood") {
        arr.push(data[i]);
      }
    }
  }

  res.render("search", { arr });
});

app.get("/movie/:name", (req, res) => {
  let datam, type;
  const { name } = req.params;
  // console.log(name);
  for (let i = 0; i < data.length; i++) {
    if (data[i].name == name) {
      datam = data[i];
      break;
    }
  }
  if (
    datam.type == "hollywood" ||
    datam.type == "bollywood" ||
    datam.type == "Hollywood" ||
    datam.type == "Bollywood"
  ) {
    type = "movie";
  } else {
    type = "web";
  }
  res.render("inner", { datam, data, type, bigImg });
});

app.get("/search", (req, res) => {
  const { q } = req.query;
  let str = q.toLowerCase();
  arr = [];
  for (let i = 0; i < data.length; i++) {
    let main = data[i].name.toLowerCase().split(" ").join("");
    let lm = main.length;
    let ls = str.length;
    let c = 0;

    for (let j = 0; j < lm; j++) {
      let temp = main.substring(j, ls + j);
      if (temp == str) {
        c++;
      }
    }
    if (c >= 1) {
      arr.push(data[i]);
    }
  }

  res.render("search", { arr });
});
app.get("*", (req, res) => {
  res.send("NOT FOUND");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
