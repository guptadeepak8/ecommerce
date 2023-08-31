const { Brand } = require("../model/brandModel");


exports.fetchAllBrand=async(req,res)=>{
  try {
    const brand=await Brand.find({})
    res.status(200).json(brand)
  } catch (error) {
    console.log(error);
  }
 
}

exports.createBrand=async(req,res)=>{
  const brand=new Brand(req.body)
  try {
    const doc =await brand.save();
    res.status(200).json(brand)
  } catch (error) {
    res.status(400).json({message:"Something went wrong"})
  }
}