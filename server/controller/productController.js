  const { Product } = require("../model/productModel")

  exports.createProduct=async(req,res)=>{
    const product=new Product(req.body);
    try {
      const docs=await product.save();
      req.status(201).json(docs)
    } catch (error) {
      res.status(400).json({message:error})
    }
  }

exports.fetchProducts=async(req,res)=>{
  //for fetching dorted data here
   // filter = {"category":["smartphone","laptops"]}
  // sort = {_sort:"price",_order="desc"}
  let condition = {}

  let query = Product.find(condition);
  let totalProductsQuery = Product.find(condition);
  if (req.query.category) {
    query = query.find({ category: {$in:req.query.category.split(',')} });
    totalProductsQuery = totalProductsQuery.find({
      category: {$in:req.query.category.split(',')},
    });
  }
  if (req.query.brand) {
    query = query.find({ brand: {$in:req.query.brand.split(',')} });
    totalProductsQuery = totalProductsQuery.find({ brand: {$in:req.query.brand.split(',') }});
  }
  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }
  try {
     const docs = await query.exec();
    res.status(200).json(docs);
  } catch (error) {
    res.status(400).json({message:error})
  }
 
}

exports.fetchProductsById=async(req,res)=>{
  const {id}=req.params;
  try {
    const product=await Product.findById(id)
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({message:error})
  }
 
}



  