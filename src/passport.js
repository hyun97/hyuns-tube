import passport from "passport";
import User from "./model/user";
import GoogleStrategy from "passport-google-oauth20";
import NaverStrategy from "passport-naver";
import dotenv from "dotenv";
import { googleCallback, naverCallback } from "./controller/globalController";
dotenv.config();

// local
passport.use(User.createStrategy());

// google
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
			callbackURL: "http://localhost:2000/auth/google/callback"
		},
		googleCallback
	)
);

// naver
passport.use(
	new NaverStrategy(
		{
			clientID: process.env.NAVER_CLIENT_ID,
			clientSecret: process.env.NAVER_CLIENT_SECRET,
			callbackURL: "http://localhost:2000/auth/naver/callback"
		},
		naverCallback
	)
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
