import express from "express";
import routes from "../routes";
import {
	userDetail,
	getEditProfile,
	postEditProfile,
	getChangePassword,
	postChangePassword
} from "../controller/userController";
import { uploadAvater, onlyPrivate } from "../middleWare";

let userRouter = express.Router();

// user detail
userRouter.get(routes.userDetail(), userDetail);

// edit profile
userRouter.get(routes.editProfile(), onlyPrivate, getEditProfile);
userRouter.post(
	routes.editProfile(),
	onlyPrivate,
	uploadAvater,
	postEditProfile
);

// change password
userRouter.get(routes.changePassword(), onlyPrivate, getChangePassword);
userRouter.post(routes.changePassword(), onlyPrivate, postChangePassword);

export default userRouter;
