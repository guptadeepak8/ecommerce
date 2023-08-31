const express=require('express')
const cors =require('cors')
const PORT = 3000;
const mongoose=require('mongoose');
const { createProduct } = require('./controller/productController');
const productRoute=require('./route/productRoute');
const userRouter=require('./route/userRouter');
const authRouter=require('./route/authRouter');
const brandRouter=require('./route/brandRouter');
const categoryRouter=require('./route/categoryRouter');
const cartRouter=require('./route/cartRouter');
const orderRouter=require('./route/orderRouter');

const app = express();

app.use(cors());
app.use(express.json())
app.use('/products',productRoute.router)
app.use('/categories',categoryRouter.router)
app.use('/brands',brandRouter.router)
app.use('/users',userRouter.router)
app.use('/auth',authRouter.router)
app.use('/cart',cartRouter.router)
app.use('/orders',orderRouter.router)

main().catch(err=>console.log(err))

async function main(){
  await mongoose.connect('mongodb+srv://gamingvector07:deepak21@cluster0.tvohhgc.mongodb.net/?retryWrites=true&w=majority');
  console.log("monggose connected succesfully");
}


app.get('/', (req, res) => {
  res.send('hello world');
});


app.listen(PORT,()=>{
  console.log(`api is running on port http://localhost:${PORT}`);
})