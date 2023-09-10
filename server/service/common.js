const passport = require("passport");

exports.isAuth=(req,res,done)=>{
  return passport.authenticate('jwt');
};

exports.cookieExtractor = function(req) {
  let token = null;
  if (req && req.cookies) {
      token = req.cookies['jwt'];
  }
   token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZmFlNTgwYjg2YzhhZGVmNjViY2FkMiIsImlhdCI6MTY5NDE4MzI1Mn0.cAQJHeujHLCPVzd21PYZMJVO4kbA9iQVw74h7smvi3M"
  return token;
};

