const { User } = require("../model/userModel");
const crypto=require('crypto')
const jwt = require('jsonwebtoken');
const SECRET_KEY=process.env.SECRET_KEY

exports.createUser = async (req, res) => {

  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async function(err, hashedPassword) {
      const user = new User({...req.body,password:hashedPassword,salt});
    const docs = await user.save();
    req.login({id:user.id},(err)=>{
      if(err){
        res.status(400).json(err)
      }else{
        const token = jwt.sign({id:user.id}, SECRET_KEY);
        res.cookie('jwt', token, { expires: new Date(Date.now() + 900000), httpOnly: true }).status(201).json({id:docs.id,token})
      }
    })
   
    })
  } catch (error) {
    console.log(error);
  }
};

exports.loginUser = async (req, res) => {
  const user=req.user
  res.cookie('jwt', req.user.token, { expires: new Date(Date.now() + 900000), httpOnly: true }).status(201).json({
    id:user.id
  })
};

exports.logout = async (req, res) => {
  res
    .cookie('jwt', null, {
      expires: new Date(Date.now()),
      httpOnly: true
    })
    .sendStatus(200)
}

exports.checkUser = async (req, res) => {
  if(req.user){

    res.json(req.user)

  }else{
    res.sendStatus(401)
  }
};
