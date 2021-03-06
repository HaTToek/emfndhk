const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('./config/passport');
const util = require('./util');

// DB setting
mongoose.set('useNewUrlParser', true);    
mongoose.set('useFindAndModify', false);  
mongoose.set('useCreateIndex', true);     
mongoose.set('useUnifiedTopology', true);
const url         =  "mongodb://localhost:27017/instagram";
mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection; 
db.once('open', function(){
  console.log('DB connected');
});
db.on('error', function(err){
  console.log('DB ERROR : ', err);
});

// Other settings
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended:true})); 
app.use(methodOverride('_method'));
app.use(flash());
app.use(session({
  secret:'MySecret',
  resave:true,
  saveUninitialized:true
})); 

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Custom Middlewares
app.use(function(req, res, next){
    res.locals.isAuthenticated  =   req.isAuthenticated();
    res.locals.currentUser      =   req.user;
    next();
})

// Router
app.use('/',require('./routes/home'));
app.use('/users', require('./routes/users'));
app.use('/posts', util.getPostQueryString, require('./routes/posts'));
app.use('/comments', util.getPostQueryString, require('./routes/comments'));

// Port setting
const port = 3000;
app.listen(port, function(){ 
    console.log('server on! http://localhost:'+port);
});