const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
const port = 3000;

// Need of variable
let arr = [];

app.get("/", (req, res) => {
  //   res.send('Hello World!');
  res.render("home", {});
});
app.get("/home", (req, res) => {
  //   res.send('Hello World!');
  res.redirect("/");
});
app.get("/inner/:name", (req, res) => {
  const { name } = req.params;
  // for (let i = 0; i < data.length; i++) {
  //   if (data[i].name == name) {
  //     datam = data[i];
  //     break;
  //   }
  // }

  // if (datam.type == "hollywood" || datam.type == "bollywood" ||datam.type == "Hollywood" ||datam.type =="Bollywood")  {
  //   type = "movie";
  // } else {
  //   type ="series";
  // }
  res.render(
    "inner",
    {}
    //  { datam, data ,type} <----Note
  );
});
// app.get("/search", (req, res) => {
//   const { q } = req.query;
//   let str = q.toLowerCase();
//   arr = [];
//   for (let i = 0; i < data.length; i++) {
//     let main = data[i].name.toLowerCase().split(" ").join("");
//     let lm = main.length;
//     let ls = str.length;
//     let c = 0;

//     for (let j = 0; j < lm; j++) {
//       let temp = main.substring(j, ls + j);
//       if (temp == str) {
//         c++;
//       }
//     }
//     if (c >= 1) {
//       arr.push(data[i]);
//     }
//   }
//   res.render("s", { arr });
// });
app.get("*", (req, res) => {
  res.send("NOT FOUND");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
