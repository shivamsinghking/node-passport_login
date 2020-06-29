const express = require('express');
const router = express.Router();

const User = require('../models/User');
const brcypt = require('bcryptjs');


router.get('/login', (req,res) => res.render('login'));

router.get('/register', (req,res) => res.render('register'));


router.post('/register' , (req,res) =>{
   const { name, email, password, password2} = req.body;
   let errors = [];

   if(!name || !email || !password || !password2){

    errors.push({msg: 'please fill the details '});
   }

   if(password !== password2){
       errors.push({msg: 'password not match'});

   }

   if(password.length < 6){
       errors.push({msg: 'pass should be greater than 6'});
   }
   if(errors.length >0){
  res.render('register', {
      errors,
      name,email,password, password2

  });
   }
   else{
    //validation
    User.findOne({email:email}) 
    .then(user => {
        if(user){
           
            errors.push({msg : 'email already register'});
            res.render('register',{
            errors,
            name,email,password, password2
            });
        
        }else{

            const newUser = new User({
                name,email,password,
  
            });
        }
    });
    console.log(newUser);
    res.send('hello');
    
   }

});

module.exports = router;