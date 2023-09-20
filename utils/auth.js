const crypto = require("crypto");

const hashPassword = (password, salt) =>
  crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512").toString("hex");

const generateSaltAndHashedPassword = (password) => {
  const salt = crypto.randomBytes(32).toString("hex");
  const hashedPassword = hashPassword(password, salt);
  return { salt, hashedPassword };
};

const isMatchingPassword = (password, salt, hashedPassword) => {
  const generatedPassword = hashPassword(password, salt);
  return hashedPassword === generatedPassword;
};

module.exports = { generateSaltAndHashedPassword, isMatchingPassword };
