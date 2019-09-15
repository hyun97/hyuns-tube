import routes from "../routes";
import User from "../model/user";

// user detail
export let userDetail = async (req, res) => {
	let id = req.params.undefined.substring(1);
	let user = await User.findOne({ _id: id }).populate({
		path: "video",
		populate: {
			path: "creator"
		}
	});
	let video = await user.video;
	res.render("userDetail", { user, video });
};

// me
export let me = async (req, res) => {
	let user = await User.findById(req.user.id).populate({
		path: "video",
		populate: {
			path: "creator"
		}
	});
	let video = await user.video;
	res.render("userDetail", { user, video });
};

// edit profile
export let getEditProfile = (req, res) => {
	res.render("editProfile");
};

export let postEditProfile = async (req, res) => {
	try {
		let {
			body: { name, email },
			user: { id }
		} = req;

		if (req.file == undefined) {
			await User.findOneAndUpdate({ _id: id }, { name, email });
		} else {
			await User.findOneAndUpdate({ _id: id }, { name, email, avatarUrl: req.file.location });
		}

		req.flash("success", "수정 완료 😀");
		res.redirect(`/user${routes.userDetail(id)}`);
	} catch (error) {
		req.flash("error", "수정 실패 😥");
		console.log(error);
		res.redirect(`/user${routes.editProfile(req.user.id)}`);
	}
};

// change password
export let getChangePassword = (req, res) => {
	res.render("changePassword");
};

export let postChangePassword = async (req, res) => {
	try {
		let {
			body: { oldPassword, newPassword, passwordVerify },
			user: { id }
		} = req;

		let user = await User.findOne({ _id: id });

		if (newPassword == passwordVerify) {
			await user.changePassword(oldPassword, newPassword);
			req.flash("success", "비밀번호 변경 완료 😀");
			res.redirect(`/user${routes.userDetail(id)}`);
		} else {
			throw Error;
		}
	} catch (error) {
		req.flash("error", "비밀번호를 확인하세요 😥");
		res.redirect(`/user${routes.changePassword(req.user.id)}`);
	}
};
