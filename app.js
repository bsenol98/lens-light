import express from "express";
import dotenv from "dotenv";
import conn from "./db.js";
import pageRoute from "./routes/pageRoute.js";
import photoRoute from "./routes/photoRoute.js";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userCheck } from "./middlewares/authMiddlewares.js";
import fileUpload from "express-fileupload";
import { v2 as cloudinary } from 'cloudinary';

global.DB_CONN_CHECK = false;
dotenv.config();
//connection db

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_API_SECRET,
});

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
app.use(fileUpload({ useTempFiles: true }))

//routes
app.use("/", function (req, res, next) {
    if (!global.DB_CONN_CHECK) {
        return res.send("Veri tabanına bağlanırken hata oluştu!");
    }
    next();
})

app.use("*", userCheck);
app.use("/", pageRoute);
app.use("/photos", photoRoute);
app.use("/user", userRoute);

app.listen(port, () => console.log(`http://localhost:${port}/`));