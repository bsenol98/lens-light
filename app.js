import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import pageRoute from "./routes/pageRoute.js";
import photoRoute from "./routes/photoRoute.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";

global.DB_CONN_CHECK = false;
dotenv.config();
//connection db
conn()

const app = express();
const port = process.env.PORT;

app.use(cors({ origin: '*' }));
//ejs template engine
app.set("view engine", "ejs")
//static files middleware
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

//routes
app.use("/", function (req, res, next) {
    if (!global.DB_CONN_CHECK) {
        return res.send("Veri tabanına bağlanırken hata oluştu!");
    }
    next();
})
app.use("/", pageRoute);
app.use("/photos", photoRoute);
app.use("/user", userRoute);

// import User from "./models/userModel.js";

import jwt from "jsonwebtoken";
app.get("/hi", async (req, res) => {
    const token = jwt.sign({ foo: 'bar' }, '$4mtK]MMV=]~C2E1A!CQmlT9i%LnSq');
    res.send(token);

    // const phoneCheck = await User.findOne({ $or: [{ "phone": "535" }, { "mail": "berkant@gmail.com" }] });
    // console.log("check", phoneCheck);
    // res.send(phoneCheck);
})

app.listen(port, () => console.log(`http://localhost:${port}/`));