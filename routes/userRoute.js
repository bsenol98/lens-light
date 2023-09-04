import express from "express";
import * as userController from "../controller/userController.js";
import * as authMiddlewares from "../middlewares/authMiddlewares.js";

const router = express.Router();

router.use(authMiddlewares.AuthenticationToken);
router.route("/").get(userController.userList).post(userController.createUserView);
router.route("/:id").get(userController.userDetail);

router.route("/api").get(userController.getAllUser)
    .post(userController.createUser);

export default router;