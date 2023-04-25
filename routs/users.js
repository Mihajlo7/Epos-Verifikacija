const express=require('express');
const rute=express.Router();
const bcrypt=require('bcryptjs')
const passport=require('passport')

const User=require('../models/User');
const { use } = require('passport');
// Login
rute.get('/login',function(req,res){
    res.render('login')
})
// Registracija
rute.get('/register',function(req,res){
    res.render('register')
})
//Registracija logika
rute.post('/register', function(req,res){
    const{name,email,password, password2}=req.body;
    let errors=[];
    //console.log(req.body);
    //Provera polja
    if(!name || !email || !password || !password2){
        errors.push({msg:'Popunite sva polja'});
    }
    // sifre iste
    if(password!==password2){
        errors.push({msg:'Sifre nisu iste'});
    }
    if(password.length<6){
        errors.push({msg:'Sifra mora imati minimum 6 karaktera'});
    }
    //console.log(errors.length)
    if(errors.length>0){
        res.render('register',{
            errors,
            name,
            password,
            password2
        });
    }else{
        // Validacija
        User.findOne({email:email }).then(function(user){
            if(user){
                errors.push({msg:'Korisnik vec postoji'});
                res.render('register',{
                    errors,
                    name,
                    password,
                    password2 
                });
            }else{
                const newUser=new User({
                    name,
                    email,
                    password
                });
                /*console.log(newUser);
                res.send('Hello');*/
                
                //Hash
                bcrypt.genSalt(10,(err,salt)=>
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err){
                        throw err;
                    }
                    //hashing sifre
                    newUser.password=hash;
                    //sacuvati korisnika u bazu
                    newUser.save().then(user=>{
                        req.flash('success_msg','Uspesno ste se registrovali');
                        res.redirect('/users/login');
                    }).catch(err=>console.log(err));
                }))
            }
        })

    }
});

//Login
rute.post('/login',function(req,res,next){
    passport.authenticate('local',{
        successRedirect:'/dashboard',
        failureRedirect:'/users/login',
        failureFlash:true
    })(req,res,next);
})

//Logout

rute.get('/logout',function(req,res){
    req.logout();
    req.flash('success_msg','Uspesno ste se izlogovali');
    res.redirect('/users/login');
});

module.exports=rute; //da imaju svi pristup????