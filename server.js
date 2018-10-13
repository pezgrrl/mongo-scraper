var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var Note = require("./models/Note.js");
var Article = require("./models/Article.js");

var methodOverride = require("method-override");

mongoose.Promise = Promise;

var app = express()

var router = express.Router();

require("./routes/routes")(router);

app.use(logger("dev"));
app.use(express.urlencoded({ 
    extended: false 
}));

app.use(express.static("public"));

app.use(router);

if(process.env.MONGODB_URI) {
    mongoose.connect(process.env.MONGODB_URI);
}else {
    mongoose.connect("mongodb://localhost/mongo-scraper", { useNewUrlParser: true });

}

var db = mongoose.connection;

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(methodOverride("_method"));

db.once("open", function() {
    console.log("Mongoose connection successful.");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("App running on port 3000");
});