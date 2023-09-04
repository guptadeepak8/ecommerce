const passport = require("passport");

exports.isAuth=(req,res,done)=>{
  return passport.authenticate('jwt');
};

exports.cookieExtractor = function(req) {
  let token = null;
  if (req && req.cookies) {
      token = req.cookies['jwt'];
  }
  token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0ZjVlNWFhNDk3ZWM5ZjZiYjhiZmYzOCIsImlhdCI6MTY5MzgzNjcxNX0.PJpcjmlkqcDvq1UbE5H7QHlUrzX3KPJKhmdE3JdIWhk"
  return token;
};

