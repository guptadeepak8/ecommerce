  const { Product } = require("../model/productModel")

  exports.createProduct=async(req,res)=>{
    const product=new Product(req.body);
    try {
      const docs=await product.save();
      req.status(201).json(docs)
    } catch (error) {
      res.status(400).json(error)
    }
  }

exports.fetchProducts=async(req,res)=>{
  //for fetching dorted data here
  try {
    const products=await Product.find({})
    res.status(200).json(products)
  } catch (error) {
    res.status(400).json(error)
  }
 
}

exports.fetchProductsById=async(req,res)=>{
  const {id}=req.params;
  try {
    const product=await Product.findById(id)
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json(error)
  }
 
}



  