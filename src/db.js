import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let dbUrl = process.env.DB_URL;

mongoose.connect(dbUrl, { useNewUrlParser: true, useFindAndModify: false });

let db = mongoose.connection;

let handleError = error => {
	console.log(`❌  Fail to Connect: ${error}`);
};

let handleSuccess = () => {
	console.log(`✅  Connect to DB`);
};

db.on("error", handleError);
db.once("open", handleSuccess);
