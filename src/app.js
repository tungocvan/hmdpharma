const path = require('path');
const express = require('express');
const handlebars = require('express-handlebars');
const route = require('./routes');
const app = express();
const port = process.env.PORT || 3000;
const session = require('express-session');
const passport = require('passport');
const db = require('./config/db/');
db.connect();
// Use static folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

app.use(session({
  resave: true, 
  saveUninitialized: true, 
  secret: 'somesecret', 
  cookie: { 
    //maxAge: 1000 * 60 * 5 //đơn vị là milisecond 5 phút
  }
}));
app.use(passport.initialize()); 
app.use(passport.session());
passport.serializeUser((username, done) => {
  done(null, username);
})
passport.deserializeUser((name, done) => {  
  if (name !=undefined || name.id !=undefined) { //tìm xem có dữ liệu trong kho đối chiếu không
    if(name.id !=undefined) name = name.id;
    return done(null, name)
  } else {
    console.log('loi');    
    return done(null, false)
  }
})


// Template engine
app.engine(
  'hbs',
  handlebars({
    extname: '.hbs',
    helpers : require('./app/helpers/handlebars')
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

global.basedir = __dirname;
// Routes init
route(app);

if(process.env.PORT === undefined){            
  const fs = require('fs');
  const https = require('https');
  const server = https.createServer({
    key: fs.readFileSync('./conf/key.pem'),
    cert: fs.readFileSync('./conf/cert.pem')
  }, app);      
  server.listen(process.env.PORT || 3000);

}else{
app.listen(port, function() {
console.log('Listening on port ' + port)
})
}