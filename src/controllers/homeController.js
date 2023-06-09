import db from "../models";
import CRUDservice from "../services/CRUDservice";
let getHomePage = async (req, res) => {
  try {
    const data = await db.User.findAll();
    return res.render("homepage.ejs", { data: JSON.stringify(data) });
  } catch (error) {
    console.log(error);
  }
};

let getAboutPage = (req, res) => {
  return res.render("test/about.ejs");
};

let getCrud = (req, res) => {
  return res.render("crud.ejs");
};

let postCrud = async (req, res) => {
  let message = await CRUDservice.createUser(req.body);
  return res.send(message);
};

let showCrud = async (req, res) => {
  let listUser = await CRUDservice.getCrud();
  res.render("showCrud.ejs", { listUser: listUser });
};

let editCrud = async (req, res) => {
  let user = await CRUDservice.getUserById(req.body.id);
  return res.render("editCrud.ejs", { user: user });
};

let updateCrud = async (req, res) => {
  await CRUDservice.updateUserById(req.body);
  return res.redirect("/get-crud");
};

let deleteCrud = async (req, res) => {
  await CRUDservice.deteleUserById(req.query.id);
  return res.redirect("/get-crud");
};

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCrud: getCrud,
  postCrud: postCrud,
  showCrud: showCrud,
  editCrud: editCrud,
  updateCrud: updateCrud,
  deleteCrud: deleteCrud,
};
