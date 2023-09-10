const express =require('express');
const { addToCart, fetchCartByUser, deleteCart, updateCart} = require('../controller/cartController');



const router=express.Router();

router.post('/',addToCart)
      .get('/',fetchCartByUser)
      .delete('/:id',deleteCart)
      .put('/:id',updateCart)

exports.router=router