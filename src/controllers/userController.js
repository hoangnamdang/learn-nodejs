import userServices from "../services/userService";

const handleUserLogin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      errMessage: "Email or Password is empty. Please enter",
    });
  }
  const userData = await userServices.handleUser(email, password);
  return res.status(200).json({
    errorCode: userData.errCode,
    message: userData.errMessage,
    userData: userData.user ? userData.user : {},
  });
};

module.exports = {
  handleUserLogin: handleUserLogin,
};
