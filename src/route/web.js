import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/about", homeController.getAboutPage);
  router.get("/crud", homeController.getCrud);
  router.post("/post-crud", homeController.postCrud);
  router.get("/get-crud", homeController.showCrud);
  router.get("/edit-crud", homeController.editCrud);
  router.post("/update-crud", homeController.updateCrud);
  router.get("/delete-crud", homeController.deleteCrud);

  router.post("/api-login", userController.handleUserLogin);
  router.get("/api/get-all-user", userController.handleGetAllUser);
  router.post("/api/add-new-user", userController.handleAddNewUser);
  router.put("/api/edit-user", userController.handleEditUser);
  router.delete("/api/delete-user", userController.handleDeleteUser);
  return app.use("/", router);
};

module.exports = initWebRoutes;
