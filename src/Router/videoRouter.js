import express from "express";
import routes from "../routes";
import {
	getUpload,
	postUpload,
	videoDetail,
	getEditVideo,
	postEditVideo,
	deleteVideo
} from "../controller/videoController";
import { uploadVideo, onlyPrivate, editThumbnail } from "../middleWare";

let videoRouter = express.Router();

// upload video
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

// video detail
videoRouter.get(routes.videoDetail(), videoDetail);

// edit video
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, editThumbnail, postEditVideo);

// delete video
videoRouter.post(routes.deleteVideo(), onlyPrivate, deleteVideo);

export default videoRouter;
