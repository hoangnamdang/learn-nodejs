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

module.exports = {
  getHomePage: getHomePage,
  getAboutPage: getAboutPage,
  getCrud: getCrud,
  postCrud: postCrud,
  showCrud: showCrud,
};
