import User from "../models/userModel.js";
import passwordHash from 'password-hash';
import jwt from "jsonwebtoken";



const loginUserView = async (req, res) => {
    const findUser = await User.findOne({ "username": req.body.username });

    if (findUser == null) {
        return res.render("login", { "valid": false, "err": ["Kullanıcı adı veya şifre hatalıdır!"] });
    } else if (!passwordHash.verify(req.body.pass, findUser.pass)) {
        return res.render("login", { "valid": false, "err": ["Kullanıcı adı veya şifre hatalıdır!"] });
    }
    const token = jwt.sign({ "user": findUser }, process.env.JWT_KEY);
    res.cookie('token', token, { "maxAge": 1000 * 60 * 15 });
    return res.redirect('/panel');
}
const createUserView = async (req, res) => {
    const result = await createUser(req.body);
    res.render("register", result);
}
const updateUserView = async (req, res) => {
    const result = await createUser(req.body);
    res.render("register", result);
}

const getAllUser = async (req, res) => {
    const userList = await User.find({});
    const length = userList.length;
    res.status(200).json({
        "valid": true,
        "data": userList,
        "err": [],
        "recordsTotal": length,
        "recordsFiltered": length,
    });
}
const createUser = async data => {
    try {
        const phoneCheck = await User.findOne({ $or: [{ "phone": data.phone }, { "mail": data.mail }] });

        if (phoneCheck != null) {
            const errArr = [];
            if (phoneCheck.phone == data.phone) errArr.push("Girilen telefon numarası sistemde mevcuttur!");
            if (phoneCheck.mail == data.mail) errArr.push("Girilen mail adresi sistemde mevcuttur!");
            return { "valid": false, "err": errArr };
        }

        const user = await User.create(data);
        return { "valid": true, "data": user, "err": [] };
    } catch (error) {
        return {
            valid: false,
            data: {},
            err: [error]
        }
    }
}

const updateUser = async data => {
    // burda kaldık
    // try {
    //     const phoneCheck = await User.findOne({ $or: [{ "phone": data.phone }, { "mail": data.mail }] });

    //     if (phoneCheck != null) {
    //         const errArr = [];
    //         if (phoneCheck.phone == data.phone) errArr.push("Girilen telefon numarası sistemde mevcuttur!");
    //         if (phoneCheck.mail == data.mail) errArr.push("Girilen mail adresi sistemde mevcuttur!");
    //         return { "valid": false, "err": errArr };
    //     }

    //     const user = await User.create(data);
    //     return { "valid": true, "data": user, "err": [] };
    // } catch (error) {
    //     return {
    //         valid: false,
    //         data: {},
    //         err: [error]
    //     }
    // }
}

export {
    createUserView,
    updateUserView,
    getAllUser,
    createUser,
    loginUserView
}