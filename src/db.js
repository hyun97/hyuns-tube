import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let dbUrl = process.env.DB_URL;
let dbName = process.env.DB_NAME;

mongoose.connect(dbUrl, { useNewUrlParser: true, useFindAndModify: false });

let db = mongoose.connection;

let handleError = error => {
	console.log(`❌  Fail to Connect: ${error}`);
};

let handleSuccess = () => {
	console.log(`✅  Connect to ${dbName}`);
};

db.on("error", handleError);
db.once("open", handleSuccess);
