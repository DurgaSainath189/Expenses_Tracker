const jsonwebtoken=require('jsonwebtoken')

const jwtManager = (user) => {

  const accesstoken = jsonwebtoken.sign(
    { _id: user._id, name: user.name },
    process.env.jwt_salt
  );
  return accesstoken;
};
module.exports = jwtManager;
