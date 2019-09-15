import express from "express";
import routes from "../routes";
import {
	views,
	comment,
	delComment,
	like,
	unlike,
	toogleLike,
	toogleUnlike,
	subscribe,
	toggleSubscribe
} from "../controller/videoController";

let apiRouter = express.Router();

apiRouter.post(routes.views(), views);
apiRouter.post(routes.comment(), comment);
apiRouter.post(routes.delComment(), delComment);
apiRouter.post(routes.like(), like);
apiRouter.post(routes.toogleLike(), toogleLike);
apiRouter.post(routes.unlike(), unlike);
apiRouter.post(routes.toogleUnlike(), toogleUnlike);
apiRouter.post(routes.subscribe(), subscribe);
apiRouter.post(routes.toogleSubscribe(), toggleSubscribe);

export default apiRouter;
