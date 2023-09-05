const express=require('express')
require('dotenv').config();
const cors =require('cors')
const PORT =process.env.PORT ;
const url=process.env.MONGODB_URL
const mongoose=require('mongoose');

const { createProduct } = require('./controller/productController');
const productRoute=require('./route/productRoute');
const userRouter=require('./route/userRouter');
const authRouter=require('./route/authRouter');
const brandRouter=require('./route/brandRouter');
const categoryRouter=require('./route/categoryRouter');
const cartRouter=require('./route/cartRouter');
const orderRouter=require('./route/orderRouter');
const session = require('express-session');
const passport = require('passport');
const cookieParser=require('cookie-parser')
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const { User } = require('./model/userModel');
const LocalStrategy=require('passport-local').Strategy
const crypto=require('crypto');
const { isAuth, cookieExtractor } = require('./service/common');
const { request } = require('http');
const path=require('path')
const app = express();


const SECRET_KEY=process.env.SECRET_KEY
const opts = {}
opts.jwtFromRequest = cookieExtractor
opts.secretOrKey = SECRET_KEY;

app.use(cors()); 
app.use(express.json())
app.use(session({
  secret: process.env.SESSION_KEY,
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something store
}));
app.use(passport.initialize());
app.use(passport.authenticate('session'));
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, 'dist')));

//passport stratiegies
passport.use('local',new LocalStrategy(
  {usernameField:'email'},
  async function(email, password, done) {
    try {
      const user = await User.findOne({ email:email});
      if (!user) {
        done(null,false,{message: "no such user email"})
      }
      crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', async function(err, hashedPassword) {
       
        if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
           return done(null,false,{ message: "password is wrong" });
        } 
        const token = jwt.sign({id:user.id}, SECRET_KEY);
        user.token = token;
        done(null,user) 
      })
      
    } catch (error) {
      console.log('Error in LocalStrategy:', error);
      done(error);
    }
  }
));

passport.use('jwt',new JwtStrategy(opts, async function(jwt_payload, done) {
  try {
    const user= await User.findById(jwt_payload.id);
    if (user) {
      return done(null, user);
  } else {
      return done(null, false);
  }
  } catch (error) {
    return done(error, false);
  }
  
}));
//this creates session variable req.user

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null,{id:user.id});
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

main().catch(err=>console.log(err)) 

async function main(){
  await mongoose.connect(url);
  console.log("monggose connected succesfully");
}


app.use('/products',productRoute.router)
app.use('/categories',categoryRouter.router)
app.use('/brands',brandRouter.router)
app.use('/users',isAuth(),userRouter.router)
app.use('/auth',authRouter.router)
app.use('/cart',isAuth(),cartRouter.router)
app.use('/orders',isAuth(),orderRouter.router)


app.listen(PORT,()=>{
  console.log(`api is running on port http://localhost:${PORT}`);
})