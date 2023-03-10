var express = require("express");
//For De[loyment]
const serverless = require("serverless-http");
const router = express.Router();



var passport = require("passport");
const path = require('path')
var expressSession = require('express-session');
const {initializingPassport, isAuthenticated} = require("../Main/database/passportConfig")

var app = express();
var PORT = 1200;
app.use(express.json());

app.use("/.netlify/functions/api", router);
app.use(express.urlencoded({extended:true}));
const {connectMongoose, User} = require("../Main/database/mongoConnect")
  connectMongoose();
const ejs = require("ejs");
const bodyParser = require("body-parser")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded ({extended:true}))

app.use(expressSession({secret:"secret", resave : false}))
initializingPassport(passport);
app.use(passport.initialize())
app.use(passport.session())

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
  app.get('/profile',(req, res) => {
    req.send(req.user);
  })
  app.get('/logout', (req, res) => {
    req.logOut(()=>{
      
    });
    res.send("LOgout Successfully....");
  })
    app.get('/login', (req, res) => {
      res.render("login");
    })
  app.post('/register', async (req, res) => {

      const user = await User.findOne({username:req.body.username})
  
      if(user) return res.status(400).send("User Already exiest");
      const newUser =await User.create(req.body)
      res.status(201).send(newUser)
    })
   app.post('/login',passport.authenticate("local",{successRedirect:"/",failureRedirect:"/register"}))
  // app.post('/login',async (req,res)=>{
  //    res.send("Hiiiii")
  // })
app.listen(PORT, function(err){
    if (err) console.log(err);
    console.log("Server listening on PORT", PORT);
}); 



module.exports = app;
module.exports.handler = serverless(app);