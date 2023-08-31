const { User } = require("../model/userModel");

exports.createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const docs = await user.save();
    res.status(200).json(docs);
  } catch (error) {
    console.log(error);
  }
};

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const password = req.body.password;
    if (user) {
      if (password === user.password) {
        res.status(200).json({id:user.id,email:user.email,name:user.name,addresses:user.addresses});
      } else {
        res.status(401).json({ message: "password is wrong" });
      }
    } else {
      res.status(400).json({ message: "user not found" });
    }
  } catch (error) {
    console.log(error);
  }
};
