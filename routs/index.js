const express=require('express');
const rute=express.Router();
const {ensureAuthenticated}=require('../dataBase/auth')
rute.get('/',function(req,res){// http zahtev za stranu
    res.render('index')
});
rute.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    name: req.user.name
  })
);

module.exports=rute; //da imaju svi pristup????
