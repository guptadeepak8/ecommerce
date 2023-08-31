const { Order } = require("../model/orderModel")

exports.fetchOrderByUser=async(req,res)=>{
   const {user}=req.query
  try {
    const order=await Order.find({user:user})
    res.status(200).json(order)
  } catch (error) {
    res.status(400).json({message:error})
  }
 
}

exports.createOrder=async(req,res)=>{
  const order=new Order(req.body) 
  console.log(order);
  try {
    const doc =await order.save();
    res.status(201).json(doc)
  } catch (error) {
    res.status(400).json(error);
  }
}

