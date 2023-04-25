const localStrategy=require('passport-local').Strategy;
const mongoose=require('mongoose');
const bcrypt=require('bcryptjs')

const User=require('../models/User');

module.exports=function(passport){
    passport.use(
        new localStrategy({usernameField: 'email'},function(email,password,done){
            //Proveriti korisnika
            User.findOne({email:email})
            .then(user=>{
                if(!user){
                   return done(null,false,{message:'Email nije registrovan'})

                }
                //Proveriti sifru da li radi
                bcrypt.compare(password,user.password,(err,isMatch)=>{
                    if(err){
                        throw err;
                    }
                    if(isMatch){
                        return done(null,user);
                    }else{
                        return done(null,false,{message:'Pogresna sifra'});
                    }
                });
            })
            .catch(err=> console.log(err));
        })
    );
    // Uzeto sa dokumtacije passport seraliyible
    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
    
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });
}