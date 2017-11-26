var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost/blog_db');

var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    created: {type: Date, default: Date.now},
    body: String
});

let Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
//     title: 'My Title',
//     image: 'https://puu.sh/y3lN1/da6f0dc51e.png',
//     body: 'this is my body from my post'
// });

// root route redirect user back to /blogs
app.get("/", (req, res) => {
    res.redirect("/blogs");
})

// route to show all of the blogs within the db
app.get("/blogs", (req, res) => {
    Blog.find({}, (err, blogs) => {
        if(err) {
            console.log(err);
        }
        else {
            res.render("index", {blogs:blogs})
        }
    })
});

app.post("/blogs", (req,res) => {
   Blog.create(req.body.blog, (err, newPost) => {
       if(err) {
           console.log('error');
           res.redirect('');
           // need to create error page for this..
       }
       else {
           res.redirect('/blogs');
       }
   })
});

// form to create new post
app.get("/blogs/new", (req, res) => {
    res.render("new");
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})