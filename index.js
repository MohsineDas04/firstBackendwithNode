const http = require("http");
const express = require("express");
const { name } = require("ejs");
const app = express();
const mongoose = require("mongoose");
const Article = require("./models/article");
const { strict } = require("assert");
// const { error } = require("console");
mongoose
   .connect(
      "mongodb+srv://Mohsine04:Mohsine123@myfirstdb.ktwuk.mongodb.net/?retryWrites=true&w=majority&appName=myFirstDB"
   )
   .then(() => {
      console.log("Database connected successfully");
   })
   .catch((error) => {
      console.log("there was a problem while connecting to the database", error);
   });
app.use(express.json());

app.get("/hello", (req, res) => {
   res.send("hello");
});

app.get("/Hi", (req, res) => {
   res.send("you said Hi , welcome");
});
app.get("/findSummation/:numOne/:numTwo", (req, res) => {
   let fNum = req.params.numOne;
   let sNum = req.params.numTwo;

   let total = Number(fNum) + Number(sNum);
   res.send(`The result is ${total}`);
});
app.get("/findSummation2", (req, res) => {
   //    let fNum = req.params.numOne;
   //    let sNum = req.params.numTwo;

   //    let total = Number(fNum) + Number(sNum);
   //    res.send(`The result is ${total}`);
   console.log(req.body);
   console.log(req.query);
   res.send("summ2Done");
});

app.post("/addComment", (req, res) => {
   res.send("Adding a new Comment");
});

app.post("/register", (req, res) => {
   let fullName = req.body.fullName;
   let email = req.body.email;
   let password = req.body.password;

   // res.send(`Here is your data to be registered :
   //    fullName : ${fullName}
   //    email : ${email}
   //    password : ${password}
   //    `);

   res.json({
      fullName: fullName,
      email: email,
      password: password,
   });
});

app.get("/numbers", (req, res) => {
   let numbers = "";

   for (let i = 0; i <= 100; i++) {
      if (i === 100) {
         numbers += i;
      } else {
         numbers += i + " - ";
      }
   }

   res.render("index.ejs", {
      name: "Mohsine",
      numbers: numbers,
   });
});
// ======== Articles ======= //

app.post("/articles", async (req, res) => {
   const newArticle = new Article();
   newArticle.title = req.body.title;
   newArticle.body = req.body.body;
   newArticle.numberofLikes = req.body.nol;
   await newArticle.save();
   res.json(newArticle);
});

app.get("/articles", async (req, res) => {
   const articles = await Article.find();

   res.json(articles);
});

app.get("/articles/:id", async (req, res) => {
   const id = req.params.id;
   const article = await Article.findById(id);
   res.json(article);
});

app.delete("/articles/:Id", async (req, res) => {
   const id = req.params.Id;
   const articleToDelete = await Article.findById(id);
   await Article.findByIdAndDelete(id);
   res.json(articleToDelete);
});

const port = 3000;

app.listen(port, () => {
   console.log(`I'm listening in port ${port}`);
});
