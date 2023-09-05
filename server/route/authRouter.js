const express =require('express');
const { createUser,loginUser, checkUser, logout } = require('../controller/authController');
const passport = require('passport');

const router=express.Router();

router.post('/signup',createUser)
.post('/login',passport.authenticate('local'),loginUser)
.get('/check',passport.authenticate('jwt'),checkUser)
.get('/logout', logout)
      

exports.router=router
 // token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjVlNWFhNDk3ZWM5ZjZiYjhiZmYzOCIsImlhdCI6MTY5MzgzNjcxNX0.PJpcjmlkqcDvq1UbE5H7QHlUrzX3KPJKhmdE3JdIWhk"