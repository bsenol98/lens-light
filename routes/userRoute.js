import express from "express";
import * as userController from "../controller/userController.js";

const router = express.Router();

router.route("/").post(userController.createUserView);

router.route("/api").get(userController.getAllUser)
    .post(userController.createUser);

export default router;