var express = require("express");
const path = require('path')
var app = express();
var PORT = 5000;
 app.use(express.json())
const {connectMongoose, User} = require("./database/mongoConnect")
  connectMongoose();
const ejs = require("ejs");
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded ({extended:true}))
app.set('view engine', 'ejs');
const static_path = path.join(__dirname, "../public");
const view_path = path.join(__dirname, "../views");

app.use(express.static(static_path));

app.get('/', (req, res) => {
  res.render("login");
})
app.get('/register', (req, res) => {
    res.render("register");
  })
app.get('/index', (req, res) => {
    res.render("index");
  })
  app.get('/chatWindow', (req, res) => {
    res.render("chatWindow");
  })
  app.get('*', (req, res) => {
    res.render("Error");
  })
app.post('/register', async (req, res) => {
    const user = await User.findOne({username:req.body.username})

    if(user) return res.status(400).send("User Already exiest");
    const newUser =await User.create(req.body)
    res.status(201).send(newUser)
  })

app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
}); 


