import User from "../models/userModel.js";
import Photo from "../models/photoModel.js";
import helperFun from "../helper/helperFunctions.js";
import passwordHash from 'password-hash';
import jwt from "jsonwebtoken";



const loginUserView = async (req, res) => {
    const findUser = await User.findOne({ "username": req.body.username });
    console.log(findUser);

    if (findUser == null) {
        return res.render("login", { "valid": false, "err": ["Kullanıcı adı veya şifre hatalıdır!"] });
    } else if (!passwordHash.verify(req.body.pass, findUser.pass)) {
        return res.render("login", { "valid": false, "err": ["Kullanıcı adı veya şifre hatalıdır!"] });
    }

    const userId = findUser._id
    const token = jwt.sign({ userId }, process.env.JWT_KEY);
    res.cookie('token', token, { "maxAge": 1000 * 60 * 15 });
    return res.redirect('/panel');
}
const createUserView = async (req, res) => {
    const result = await createUser(req.body);
    res.render("register", result);
}
const userList = async (req, res) => {
    const userList = await getAllUser(res?.locals?.user?._id);
    res.render("users", { userList });
}
const userDetail = async (req, res) => {
    const userId = helperFun.toObjectId(req.params.id);
    const result = await getUserById(userId);
    res.render("user", { result });
}

const updateUserView = async (req, res) => {
    const result = await createUser(req.body);
    res.render("register", result);
}

const getAllUser = async (notInId = null) => {
    try {
        const query = {}
        if (notInId !== null) query["_id"] = { $ne: notInId };

        const userList = await User.find(query);
        return {
            "valid": true,
            "data": userList,
            "err": [],
        }
    } catch (error) {
        return {
            "valid": false,
            "data": [],
            "err": ["Kullanıcılar listelenirken bir hata oluştu!"]
        }
    }

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
const getUserById = async userId => {
    try {
        const userData = await User.findById(userId);
        const userPhotoList = await Photo.find({ user: userId });
        return {
            "valid": true,
            "data": {
                "user": userData,
                "photoList": userPhotoList
            },
            "err": [],
        }
    } catch (error) {
        console.log(error);
        return {
            "valid": false,
            "data": [],
            "err": ["Kullanıcı bulunurken bir hata oluştu!"]
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
    loginUserView,
    userList,
    userDetail
}