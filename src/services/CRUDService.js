import bcrypt from "bcryptjs";
import db from "../models";

const salt = bcrypt.genSaltSync(10);

let createUser = async (data) => {
  try {
    const hashPassword = await createHashPassword(data.password);
    await db.User.create({
      email: data.email,
      password: hashPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      gender: data.gender,
      phoneNumber: data.phoneNumber,
      roleId: data.roleId,
    });
    return "create user success";
  } catch (error) {
    console.log(error);
  }
};

let createHashPassword = async (password) => {
  try {
    const hash = await bcrypt.hashSync(password, salt);
    return hash;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser: createUser,
};
