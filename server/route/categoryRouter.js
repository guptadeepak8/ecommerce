const express =require('express');
const { createBrand, fetchAllBrand } = require('../controller/brandController');
const { createCategory, fetchAllCategory } = require('../controller/categoryController');


const router=express.Router();

router.post('/',createCategory)
      .get('/',fetchAllCategory)

exports.router=router