import express from "express";
import * as pageController from "../controller/pageController.js";
import * as userController from "../controller/userController.js";
import jwt from "jsonwebtoken";


const router = express.Router()

const authCheck = (req, res, next) => {
    jwt.verify(req.cookies?.token, process.env.JWT_KEY, function (err, decoded) {
        if (err) return res.redirect('/login');
        res.cookie('token', req.cookies?.token, { "maxAge": 1000 * 60 * 15 });
        req.userAuth = decoded;
        next();
    });
}

router.route("/").get(pageController.getIndexPage)
router.route("/about").get(pageController.getAboutPage)
router.route("/login").get(pageController.getLoginPage).post(userController.loginUserView)
router.route("/register").get(pageController.getRegisterPage).post(userController.createUserView)
router.route("/logout").get(authCheck, pageController.getLogoutPage)
router.route("/panel").get(authCheck, pageController.getPanelPage)

export default router