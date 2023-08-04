const jsonwebtoken = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    const accesstoken = req.headers.authorization.replace("Bearer ", "");
    const jwt_payload = jsonwebtoken.verify(accesstoken, process.env.jwt_salt);
    // console.log(jwt_payload);

    req.user=jwt_payload;
  } catch (error) {
    res.status(401).json({
        status:"Failed",
        message:"Unauthorized"
    })
    return;
  }
  next();
};
module.exports = auth;
