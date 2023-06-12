import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const userCheck = async (req, res, next) => {
    jwt.verify(req.cookies?.token, process.env.JWT_KEY, async function (err, decoded) {
        if (err) {
            res.locals.user = null;
            next();
        } else {
            res.locals.user = await User.findById(decoded.userId);
            next();
        }
    });
}

const AuthenticationToken = (req, res, next) => {
    jwt.verify(req.cookies?.token, process.env.JWT_KEY, function (err, decoded) {
        if (err) return res.redirect('/login');
        res.cookie('token', req.cookies?.token, { "maxAge": 1000 * 60 * 15 });
        res.userAuth = decoded;
        next();
    });
}

export { AuthenticationToken, userCheck }