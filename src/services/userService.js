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

module.exports = {
  handleUser: handleUser,
};
