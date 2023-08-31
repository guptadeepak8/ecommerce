const express =require('express');
const { createOrder, fetchOrderByUser } = require('../controller/orderController');




const router=express.Router();

router.post('/',createOrder)
      .get('/',fetchOrderByUser)

exports.router=router