import routes from "./routes";
import multer from "multer";
import multerS3 from "multer-s3";
import User from "./model/user";
import moment from "moment";
import dotenv from "dotenv";
import aws from "aws-sdk";

dotenv.config();

let s3 = new aws.S3({
	accessKeyId: process.env.AWS_KEY,
	secretAccessKey: process.env.AWS_SECRET,
	region: "ap-northeast-2"
});

// global variable
export let globalVariable = async (req, res, next) => {
	res.locals.routes = routes;
	res.locals.hyuns = "Hyuns";
	res.locals.loggedUser = req.user;
	res.locals.loggedUserSubscribe = await User.findById(req.user).populate("subscribe");
	moment.updateLocale("en", {
		relativeTime: {
			future: "in %s",
			past: "%s 전",
			s: "몇 초",
			ss: "%d초",
			m: "1분",
			mm: "%d분",
			h: "1시간",
			hh: "%d시간",
			d: "1일",
			dd: "%d일",
			M: "1개월",
			MM: "%d개월",
			y: "1년",
			yy: "%d년"
		}
	});
	res.locals.moment = moment;
	next();
};

// avatar multer
let setAvatar = multer({
	storage: multerS3({
		s3: s3,
		acl: "public-read",
		bucket: "hyuns-tube/avatar"
	})
});
export let uploadAvater = setAvatar.single("avatar");

// thumbnail & video multer
var storage = multer.diskStorage({
	destination: function(req, file, cb) {
		if (file.fieldname == "video") {
			cb(null, "hyuns-tube/video");
		} else if (file.fieldname == "thumbnail") {
			cb(null, "hyuns-tube/thumbnail");
		}
	}
});
let setVideo = multer({
	storage: multerS3({
		s3: s3,
		acl: "public-read",
		bucket: storage.getDestination
	})
});

export let uploadVideo = setVideo.fields([
	{
		name: "video",
		maxCount: 1
	},
	{
		name: "thumbnail",
		maxCount: 1
	}
]);

// edit thumbnail multer
let setEditThumbnail = multer({
	storage: multerS3({
		s3: s3,
		acl: "public-read",
		bucket: "hyuns-tube/thumbnail"
	})
});
export let editThumbnail = setEditThumbnail.single("thumbnail");

// router security
export let onlyPrivate = (req, res, next) => {
	if (req.user) {
		next();
	} else {
		req.flash("info", "로그인 후 사용 가능합니다 🔒");
		res.redirect(routes.home);
	}
};

export let onlyPublic = (req, res, next) => {
	if (!req.user) {
		next();
	} else {
		req.flash("info", "잘못된 접근 입니다 🔒");
		res.redirect(routes.home);
	}
};
