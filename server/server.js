const express=require('express')
const cors =require('cors')
const app = express();
const PORT = 8000;
const mongoose=require('mongoose')
app.use(cors());

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