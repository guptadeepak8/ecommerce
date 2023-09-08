const express =require('express');
const { createUser,loginUser, checkUser, logout } = require('../controller/authController');
const passport = require('passport');

const router=express.Router();

router.post('/signup',createUser)
.post('/login',loginUser)
.get('/check',passport.authenticate('jwt'),checkUser)
.get('/logout', logout)
      

exports.router=router
