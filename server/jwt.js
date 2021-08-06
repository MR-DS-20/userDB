const { TOKEN_SECRET } = require("./environment");
// if(!TOKEN_SECRET){
//     process.exit(1)
// }
const jwt = require("jsonwebtoken");

function generateAccessToken(uuid) {
  return jwt.sign(uuid, TOKEN_SECRET);
}

function verifyJwt(token) {
  return jwt.verify(token, TOKEN_SECRET);
}

module.exports = {
  generateAccessToken: generateAccessToken,
  verifyJwt: verifyJwt,
};
