import routes from "../routes";
import passport from "passport";
import User from "../model/user";
import Video from "../model/video";

// home
export let home = async (req, res) => {
	let video = await Video.find({}).populate("creator");
	res.render("home", { video });
};

// search
export let search = async (req, res) => {
	let {
		query: { search }
	} = req;
	let video = await Video.find({
		title: { $regex: search, $options: "i" }
	}).populate("creator");
	res.render("search", { video });
};

// join
export let getJoin = (req, res) => {
	res.render("join");
};

export let postJoin = async (req, res, next) => {
	try {
		let {
			body: { name, email, password, password2 }
		} = req;
		if (password == password2) {
			await User.register(
				{
					name,
					email,
					avatarUrl: "https://api.adorable.io/avatars/149/abott@adorable.png"
				},
				password
			);
			next();
		} else {
			req.flash("error", "비밀번호가 다릅니다 😥");
			res.redirect(routes.join);
		}
	} catch (error) {
		res.redirect(routes.join);
		console.log(error);
	}
};

// login
export let getLogin = (req, res) => {
	res.render("login");
};

export let postLogin = passport.authenticate("local", {
	failureRedirect: routes.login,
	successRedirect: routes.home,
	successFlash: "Welcome 😀",
	failureFlash: "이름 또는 비밀번호를 확인하세요 😥"
});

// like video
export let like = async (req, res) => {
	let user = await User.findById(req.user.id).populate({
		path: "like",
		populate: {
			path: "creator"
		}
	});
	res.render("like", { user });
};

// subscribe video
export let subscribe = async (req, res) => {
	let user = await User.findById(req.user.id);
	let video = await Video.find({
		creator: user.subscribe
	}).populate("creator");

	res.render("subscribe", { video });
};

// video history
export let history = async (req, res) => {
	let user = await User.findById(req.user.id).populate({
		path: "history",
		populate: {
			path: "creator"
		}
	});

	res.render("history", { user });
};

// google
export let authGoogle = passport.authenticate("google", {
	scope: ["profile", "email"]
});

export let googleCallback = async (accessToken, refreshToken, profile, cb) => {
	try {
		let {
			_json: { sub: googleId, name, picture: avatarUrl, email }
		} = profile;

		let findUser = await User.findOne({ googleId });
		let randomNum = Math.floor(Math.random() * 100 + 1);

		if (findUser) {
			return cb(null, findUser);
		} else {
			let createUser = await User.create({
				name: `${name}#${randomNum}`,
				email,
				avatarUrl,
				googleId
			});
			return cb(null, createUser);
		}
	} catch (error) {
		return cb(error);
	}
};

export let catchGoogleCallback = passport.authenticate("google", {
	failureRedirect: routes.login,
	successRedirect: routes.home,
	successFlash: "Welcome 😀",
	failureFlash: "로그인 실패"
});

// naver
export let authNaver = passport.authenticate("naver");

export let naverCallback = async (accessToken, refreshToken, profile, cb) => {
	try {
		let {
			_json: { id: naverId, nickname: name, profile_image: avatarUrl, email }
		} = profile;

		let findUser = await User.findOne({ naverId });
		let randomNum = Math.floor(Math.random() * 100 + 1);

		if (findUser) {
			return cb(null, findUser);
		} else {
			let createUser = await User.create({
				name: `${name}#${randomNum}`,
				email,
				avatarUrl,
				naverId
			});
			return cb(null, createUser);
		}
	} catch (error) {
		return cb(error);
	}
};

export let catchNaverCallback = passport.authenticate("naver", {
	failureRedirect: routes.login,
	successRedirect: routes.home,
	successFlash: "Welcome 😀",
	failureFlash: "로그인 실패"
});

// logout
export let logout = (req, res) => {
	req.flash("success", "Good Bye 😀");
	req.logout();
	res.redirect(routes.home);
};
