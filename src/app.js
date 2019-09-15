import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import session from "express-session";
import flash from "express-flash";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import passport from "passport";
import { globalVariable } from "./middleWare";
import globalRouter from "./Router/globalRouter";
import userRouter from "./Router/userRouter";
import videoRouter from "./Router/videoRouter";
import apiRouter from "./Router/apiRouter";
import routes from "./routes";
import connectMongo from "connect-mongo";
import path from "path";

dotenv.config();

let app = express();
let mongoStore = connectMongo(session);

// module
app.use(helmet());
app.use(flash());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: false,
		store: new mongoStore({ mongooseConnection: mongoose.connection })
	})
);

// passport
app.use(passport.initialize());
app.use(passport.session());

// template
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// middleWare
app.use(globalVariable);
app.use("/static", express.static(path.join(__dirname, "static")));

// routes
app.use(routes.home, globalRouter);
app.use(routes.auth, globalRouter);
app.use(routes.user, userRouter);
app.use(routes.video, videoRouter);
app.use(routes.api, apiRouter);

export default app;
