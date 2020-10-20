const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');
//login
router.get('/users/signin',(req, res) => {
    res.render('users/signin');
});

router.post('/users/signin', passport.authenticate('local', {
    successRedirect: '/citas',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/users/signup',(req, res) => {
    res.render('users/signup');
});

//recibir datos de registro
router.post('/users/signup', async (req, res) =>{
    const {name,apellido,telefono,email, password, confirm_password} = req.body;
    const errors = [];
    
    if(!name){
        errors.push({text: 'Por favor inserte su nombre'});
    }
    if(!apellido){
        errors.push({text: 'Por favor inserte su apellido'});
    }
    if(!telefono){
        errors.push({text: 'Por favor inserte su teléfono'});
    }
    if(password != confirm_password){
        errors.push({text: 'Contraseñas diferentes'});
    }
    if (password.length < 4){
        errors.push({text: 'Contraseña debe ser mayor a 4 dígitos'});
    }
    if (errors.length > 0){
        res.render('users/signup',{errors,name,apellido,telefono,email, password, confirm_password});
    }else{
        const emailUser = await User.findOne({email: email});
         if(emailUser){
            req.flash('error_msg','El email está en uso');
            res.redirect('/users/signup');
        }
        
        const newUser = new User({name,apellido,telefono,email, password});
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg','Registro exitoso');
        res.redirect('/users/signin');
    }
   
});


module.exports = router;