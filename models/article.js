const mgs = require("mongoose");

const Schema = mgs.Schema;

const articleSchema = new Schema({
   title: String,
   body: String,
   numberofLikes: Number,
});

const Article = mgs.model("article", articleSchema);

module.exports = Article;
