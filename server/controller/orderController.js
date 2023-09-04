const { Order } = require("../model/orderModel")

exports.fetchOrderByUser=async(req,res)=>{
   const {id}=req.user
  try {
    const order=await Order.find({user:id})
    res.status(200).json(order)
  } catch (error) {
    res.status(400).json({message:error})
  }
 
}


exports.createOrder=async(req,res)=>{
  const order=new Order(req.body) 
  try {
    const doc =await order.save();
    res.status(201).json(doc)
  } catch (error) {
    res.status(400).json(error);
  }
}

