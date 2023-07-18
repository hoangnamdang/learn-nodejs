import db from "../models";
import bcrypt from "bcryptjs";
const handleUser = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      const isExit = await handleExitUser(email);
      if (isExit) {
        const user = await db.User.findOne({
          where: { email: email },
        });
        if (user) {
          const check = await bcrypt.compareSync(password, user.password); // true
          if (check) {
            userData.errCode = 0;
            userData.errMessage = "0k";
            userData.user = user;
            resolve(userData);
          } else {
            userData.errCode = 2;
            userData.errMessage = "Wrong password";
            resolve(userData);
          }
        } else {
          userData.errCode = 1;
          userData.errMessage = "Email not exit in database";
          resolve(userData);
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = "Email not exit in database";
        resolve(userData);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleExitUser = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isExit = await db.User.findOne({ where: { email: userEmail } });
      if (isExit) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleGetAllUser = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = "";
      if (userId === "ALL") {
        user = await db.User.findAll({});
      }
      if (userId && userId !== "ALL") {
        user = await db.User.findOne({
          where: {
            id: userId,
          },
        });
      }
      resolve(user);
    } catch (error) {
      reject(error);
    }
  });
};
const handleDeleteUser = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await db.User.findOne({ where: { id: id } });
      if (user) {
        await db.User.destroy({ where: { id: id } });
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleHashPassWord = async (password) => {
  let salt = await bcrypt.genSaltSync(10);
  let hash = await bcrypt.hashSync(password, salt);
  return hash;
};
const handleAddNewUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const password = data.password;
      const hashPassword = await handleHashPassWord(password);
      const isExit = await db.User.findOne({ where: { email: data.email } });
      console.log({ isExit });
      if (isExit) {
        resolve(false);
      } else {
        await db.User.create({
          email: data.email,
          password: hashPassword,
          firstName: data.firstName,
          lastName: data.lastName,
        });
        resolve(true);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const handleEditUser = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const isExit = db.User.findOne({ where: { id: data.id } });
      if (isExit) {
        await db.User.update(
          { firstName: data.firstName, lastName: data.lastName },
          { where: { id: data.id } }
        );
        resolve(true);
      } else {
        reject(false);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const getAllCode = (paramType) => {
  return new Promise(async (resolve, reject) => {
    if (!paramType) return resolve(false);
    try {
      const allCode = await db.allcode.findAll({ where: { type: paramType } });
      if (allCode) {
        resolve(allCode);
      } else {
        resolve([]);
      }
    } catch (error) {
      reject(error);
    }
  });
};
module.exports = {
  handleUser: handleUser,
  handleGetAllUser: handleGetAllUser,
  handleDeleteUser: handleDeleteUser,
  handleAddNewUser: handleAddNewUser,
  handleEditUser: handleEditUser,
  getAllCode: getAllCode,
};
