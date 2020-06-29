const LocalStrategy = require('passport-local').Strategy;
const mongosee = require('mongoosee');
const bcrypt = require('bcryptjs');


//load user model
 const User = require('../models/User');

 module.exports = function(passport){
     passport.use(
    new LocalStrategy({usernameField: 'email'},( email,passport,done) =>{
      User.findOne({ email: email})
      .then(user =>{
          if(!user)
          {
              return done(null,false, {message: 'user not found'});
          }
          //mathching password
          bcrypt.compare(password, user.password, (err,isMatch) =>
          {
              if(err) throw err;

              if(isMatch)
              {
                  return done(null, user,{ message: 'user matched'});
              }else{
                  return done(null, false,{message:'passwordIncorrect'});
              }
          })
      })
      .catch(err => console.log(err))
    })
     );
     passport.serializeUser((user,done) =>{
         done(null, user.id);
     });
     passport.deserializeUser((id,done) =>{
         User.findById(id, (err,user) =>{
             done(err, user);
         })
     })
     
 }


