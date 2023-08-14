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

const handleGetAllUser = async (req, res) => {
  const id = req.query.id;
  const user = await userServices.handleGetAllUser(id);
  if (!user) {
    return res.status(200).json({
      errorCode: 1,
      message: "Missing id",
    });
  }
  return res.status(200).json({
    errCode: 0,
    message: "Ok",
    userData: user || {},
  });
};

const handleDeleteUser = async (req, res) => {
  const id = req.body.id;
  const isDeleted = await userServices.handleDeleteUser(id);
  if (isDeleted) {
    return res.status(200).json({
      errorCode: 0,
      message: "Delete user success",
    });
  }
  return res.status(200).json({
    errorCode: 1,
    message: "user id not in database",
  });
};

const handleAddNewUser = async (req, res) => {
  console.log({ bod: req.body });
  const user = await userServices.handleAddNewUser(req.body);
  console.log({ user });
  if (user) {
    return res.status(200).json({
      errCode: 0,
      message: "Add user success",
    });
  } else {
    return res.status(200).json({
      errCode: 1,
      message: "email has exit",
    });
  }
};

const handleEditUser = async (req, res) => {
  const user = await userServices.handleEditUser(req.body.data);
  if (user) {
    return res.status(200).json({
      errCode: 0,
      message: "Insert user success",
    });
  } else {
    return res.status(200).json({
      errCode: 1,
      message: "User not exits",
    });
  }
};

const getAllCode = async (req, res) => {
  const allCode = await userServices.getAllCode(req.query.type);
  if (allCode) {
    return res.status(200).json({
      errCode: 0,
      data: allCode,
    });
  } else {
    res.status(200).json({
      errorCode: 1,
      message: "Missing param type",
    });
  }
};

module.exports = {
  handleUserLogin: handleUserLogin,
  handleGetAllUser: handleGetAllUser,
  handleDeleteUser: handleDeleteUser,
  handleAddNewUser: handleAddNewUser,
  handleEditUser: handleEditUser,
  getAllCode: getAllCode,
};
