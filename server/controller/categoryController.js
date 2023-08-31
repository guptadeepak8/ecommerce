const { Category } = require("../model/categoryModel");

exports.fetchAllCategory=async(req,res)=>{
  try {
    const category=await Category.find({})
    res.status(200).json(category)
  } catch (error) {
    res.status(400).json({message:"Something went wrong"})
  }
}

exports.createCategory=async(req,res)=>{
  const category=new Category(req.body)
  try {
    const doc =await category.save();
    res.status(200).json(category)
  } catch (error) {
    res.status(400).json({message:"Something went wrong"})
  }
}