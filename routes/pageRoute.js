import express from "express";
import * as pageController from "../controller/pageController.js";
import * as userController from "../controller/userController.js";
import * as authMiddlewares from "../middlewares/authMiddlewares.js";


const router = express.Router()

router.route("/").get(pageController.getIndexPage)
router.route("/about").get(pageController.getAboutPage)
router.route("/login").get(pageController.getLoginPage).post(userController.loginUserView)
router.route("/register").get(pageController.getRegisterPage).post(userController.createUserView)
router.route("/logout").get(authMiddlewares.AuthenticationToken, pageController.getLogoutPage)
router.route("/panel").get(authMiddlewares.AuthenticationToken, pageController.getPanelPage)

export default router