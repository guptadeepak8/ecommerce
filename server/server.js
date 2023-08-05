const express=require('express')

const cors =require('cors')
const app = express();

app.use(cors());

const names =[
  {
    id:1,
    fname:'deepak',
    islike:false,
  },
  {
    id:2,
    fname:'vinay',
    islike:false,
  },
  {
    id:3,
    fname:'nimesh',
    islike:false,
  },
  {
    id:4,
    fname:'vikas',
    islike:false,
  },
]

const PORT = 5000;
app.get('/', (req, res) => {
  res.json({data:names});
});

app.listen(PORT,()=>{
  console.log(`api is running on port http://localhost:${PORT}`);
})