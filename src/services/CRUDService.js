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

let getCrud = async () => {
  let data = await db.User.findAll();
  return data;
};

let getUserById = async (id) => {
  let data = await db.User.findOne({ id: id });
  return data;
};

let updateUserById = async (data) => {
  try {
    let user = await db.User.findOne({ id: data.id });
    if (Object.keys(user).length > 0) {
      await db.User.update(
        {
          email: data.email,
          firstName: data.firstName,
          address: data.address,
          phoneNumber: data.phoneNumber,
        },
        {
          where: {
            id: data.id,
          },
        }
      );
    }
  } catch (error) {
    console.log(error);
  }
};

let deteleUserById = async (id) => {
  try {
    await db.User.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {}
};

module.exports = {
  createUser: createUser,
  getCrud: getCrud,
  getUserById: getUserById,
  updateUserById: updateUserById,
  deteleUserById: deteleUserById,
};
