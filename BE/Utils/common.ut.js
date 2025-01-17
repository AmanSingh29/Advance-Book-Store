function generateAlphanumericString(length = 8) {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

const generateJwtToken = (payload, secret) => {
  if(!payload || !secret) return null;
  const jwt = require("jsonwebtoken");
  const token = jwt.sign(payload, secret, { expiresIn: "1d" })
  return token;
}

module.exports = {
  generateAlphanumericString,
  generateJwtToken
};
