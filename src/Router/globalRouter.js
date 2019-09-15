import express from "express";
import routes from "../routes";
import "../passport";
import {
	home,
	getJoin,
	postJoin,
	getLogin,
	postLogin,
	logout,
	authGoogle,
	authNaver,
	catchGoogleCallback,
	catchNaverCallback,
	search,
	like,
	subscribe,
	history
} from "../controller/globalController";
import { me } from "../controller/userController";
import { onlyPrivate, onlyPublic } from "../middleWare";

let globalRouter = express.Router();

// home
globalRouter.get(routes.home, home);

// search
globalRouter.get(routes.search, search);

// me
globalRouter.get(routes.me, onlyPrivate, me);

// join
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

// login
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

// like video
globalRouter.get(routes.likeVideo, onlyPrivate, like);

// subscribe video
globalRouter.get(routes.subscribeVideo, onlyPrivate, subscribe);

// video history
globalRouter.get(routes.history, onlyPrivate, history);

// google auth
globalRouter.get(routes.googleLogin, onlyPublic, authGoogle);
globalRouter.get(routes.googleCallback, onlyPublic, catchGoogleCallback);

// naver auth
globalRouter.get(routes.naverLogin, onlyPublic, authNaver);
globalRouter.get(routes.naverCallback, onlyPublic, catchNaverCallback);

// logout
globalRouter.get(routes.logout, onlyPrivate, logout);

export default globalRouter;
