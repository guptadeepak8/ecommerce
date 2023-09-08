const passport = require("passport");

exports.isAuth=(req,res,done)=>{
  return passport.authenticate('jwt');
};

exports.cookieExtractor = function(req) {
  let token = null;
  if (req && req.cookies) {
      token = req.cookies['jwt'];
  }
  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmFkYmNlZTY3ZDhmOGFjNmMwNzg5OSIsImlhdCI6MTY5NDE2MTg3MX0.BXL4dZjRniHV3pWXOiVQ7_VPBXCLpv8LUOPkkfGI0g8"
 
  return token;
};

