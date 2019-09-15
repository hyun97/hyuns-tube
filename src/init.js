import "@babel/polyfill";
import dotenv from "dotenv";
import app from "./app";
import "./db";

dotenv.config();

// model
import "./model/comment";
import "./model/user";
import "./model/video";

let handleListening = () => {
	console.log(`✅  Connect to localhost:2000`);
};

app.listen(2000, handleListening);
