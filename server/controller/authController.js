const { User } = require("../model/userModel");
const crypto=require('crypto')
const jwt = require('jsonwebtoken');
const SECRET_KEY=process.env.SECRET_KEY

exports.createUser = async (req, res) => {
  try {
    const salt = crypto.randomBytes(16);
    crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async function(err, hashedPassword) {
      if (err) {
        // Handle hashing error
        return res.status(500).json({ message: "Error hashing password" });
      }

      const user = new User({ ...req.body, password: hashedPassword, salt });
      try {
        const docs = await user.save();
        req.login({ id: user.id }, (err) => {
          if (err) {
            // Handle login error
            return res.status(500).json({ message: "Error while registering  user" });
          }

          const token = jwt.sign({ id: user.id }, SECRET_KEY);
          res.cookie('jwt', token, { expires: new Date(Date.now() + 900000), httpOnly: true }).status(201).json({ id: docs.id, token });
        });
      } catch (error) {
        
        res.status(401).json({ message: "Email has already been registered" });
      }
    });
  } catch (error) {
    // Handle other errors
    res.status(400).json({ message: "Error creating user" });
  }
};



exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({ message: 'No such user email' });
    }

    crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', async function (err, hashedPassword) {
     
      if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
        return res.status(401).json({ message: 'Password is wrong' });
      }
      const token = jwt.sign({ id: user.id }, SECRET_KEY);

      res.cookie('jwt', token, { expires: new Date(Date.now() + 900000), httpOnly: true }).json({ id: user.id });;
    });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
exports.logout = async (req, res) => {
  try {
    res
    .cookie('jwt', null, {
      expires: new Date(Date.now()),
      httpOnly: true
    })
    .sendStatus(200)
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
  
}

exports.checkUser = async (req, res) => {
  try {
    if(req.user){
      res.json(req.user)
    }else{
      res.sendStatus(401)
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
 
};
