let routes = {
	// global
	home: "/",
	search: "/search",
	join: "/join",
	login: "/login",
	logout: "/logout",
	likeVideo: "/like",
	subscribeVideo: "/subscribeVideo",
	history: "/history",

	// user
	user: "/user",
	userDetail: id => {
		return `/:${id}`;
	},
	editProfile: id => {
		return `/:${id}/edit`;
	},
	changePassword: id => {
		return `/:${id}/change-password`;
	},
	me: "/profile",

	// auth
	auth: "/auth",
	googleLogin: "/google",
	googleCallback: "/google/callback",
	naverLogin: "/naver",
	naverCallback: "/naver/callback",

	// video
	video: "/video",
	upload: "/upload",
	videoDetail: id => {
		return `/:${id}`;
	},
	editVideo: id => {
		return `/:${id}/edit`;
	},
	deleteVideo: id => {
		return `/:${id}/delete`;
	},

	// api
	api: "/api",
	views: id => {
		return `/:${id}/views`;
	},
	comment: id => {
		return `/:${id}/comment`;
	},
	delComment: id => {
		return `/:${id}/delete-comment`;
	},
	like: id => {
		return `/:${id}/like`;
	},
	toogleLike: id => {
		return `/:${id}/toggleLike`;
	},
	unlike: id => {
		return `/:${id}/unlike`;
	},
	toogleUnlike: id => {
		return `/:${id}/toggleUnlike`;
	},
	subscribe: id => {
		return `/:${id}/subscribe`;
	},
	toogleSubscribe: id => {
		return `/:${id}/toggleSubscribe`;
	}
};

export default routes;
