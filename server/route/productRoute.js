const express =require('express');
const { createProduct, fetchProducts, fetchProductsById } = require('../controller/productController');

const router=express.Router();

router.post('/',createProduct)
      .get('/',fetchProducts)
      .get('/:id',fetchProductsById)

exports.router=router