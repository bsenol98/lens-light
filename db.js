import mongoose from "mongoose";

const conn = () => {
    mongoose.connect(process.env.DB_URL, {
        dbName: "lenslight",
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        global.DB_CONN_CHECK = true;
        console.log("Connected to the db success...");
    }).catch(e => {
        global.DB_CONN_CHECK = false;
        console.log(`DB Connection err: ${e}`);
    });
};

export default conn;