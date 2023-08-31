const express =require('express');
const { createBrand, fetchAllBrand } = require('../controller/brandController');


const router=express.Router();

router.post('/',createBrand)
      .get('/',fetchAllBrand)

exports.router=router