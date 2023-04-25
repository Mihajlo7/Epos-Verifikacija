// Pozivanje tehnologija u applikaciju
const express=require('express');
const expressLayouts=require('express-ejs-layouts')
const mongoose=require('mongoose');
const flash=require('connect-flash');
const session=require('express-session');
const passport=require('passport')

const app=express();

//Passport config
require('./dataBase/passport')(passport);

//DB 
const db=require('./dataBase/dateBase')// povezuje bazu

// Dinamicke strane
app.use(expressLayouts);
app.set('view engine','ejs');// ubacuje se engine ejs

//Bodyparser
app.use(express.urlencoded({extended:false}));

//Express session
app.use(session({
    secret: 'fonovci',
    resave: true,
    saveUninitialized: true
    
  }));

  // Passport middleware
app.use(passport.initialize());
app.use(passport.session());


// Connect flash
app.use(flash());


// Globalne 
app.use(function(req,res,next){
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    next();

});
//Putanje
app.use('/',require('./routs/index'));
app.use('/users',require('./routs/users'));// uzima putanju dotle
const port=3000;

app.listen(port,console.log('Server radi na portu '+port))//Aplikacija zauzima port 3000
