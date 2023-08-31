const express =require('express');
const { fetchUserById, updateUser } = require('../controller/userController');

const router=express.Router();

router.get('/:id',fetchUserById)
      .patch('/:id',updateUser)

exports.router=router