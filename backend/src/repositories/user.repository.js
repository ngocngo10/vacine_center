const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

async function createUser(userInfo) {
  const newUser = await User.create(userInfo);
  await newUser.save();
}

async function findUserByPhoneNumber(phoneNumber) {
  const user = await User.findOne({
    where: { phoneNumber }
  });
  return user;
}
async function findAllUsers(phoneNumber) {
  const users = await User.findAll();
  return users;
}

module.exports = {
  createUser,
  findUserByPhoneNumber,
  findAllUsers,
}
