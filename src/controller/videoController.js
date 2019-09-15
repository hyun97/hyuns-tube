import routes from "../routes";
import Video from "../model/video";
import User from "../model/user";
import Comment from "../model/comment";

// upload
export let getUpload = (req, res) => {
	res.render("upload");
};

export let postUpload = async (req, res) => {
	try {
		let {
			files: {
				video: [{ location: videoPath }],
				thumbnail: [{ location: thumbnailPath }]
			},
			body: { title, description },
			user
		} = req;

		let video = await Video.create({
			file: videoPath,
			thumbnail: thumbnailPath,
			title,
			description,
			creator: user.id
		});

		let uploadUser = await User.findById(user.id);
		await uploadUser.video.push(video.id);
		uploadUser.save();

		req.flash("success", "업로드 성공 😀");
		res.redirect(routes.home);
	} catch (error) {
		req.flash("error", "업로드 실패 😥");
		res.redirect(`/video${routes.upload}`);
	}
};

// video detail
export let videoDetail = async (req, res) => {
	try {
		let user = req.user;
		let id = req.params.undefined.substring(1);
		let video = await Video.findById(id)
			.populate("creator")
			.populate({
				path: "comment",
				populate: {
					path: "creator"
				}
			});

		if (!(user == undefined)) {
			if (user.history.indexOf(id) == -1) {
				user.history.push(id);
				user.save();
			} else {
				// 최근 본 영상이 이미 배열에 있는 경우
				user.history.splice(user.history.indexOf(id), 1);
				user.history.push(id);
				user.save();
			}
		}

		res.render("videoDetail", { video });
	} catch (error) {
		console.log(error);
		res.redirect(routes.home);
	}
};

// edit video
export let getEditVideo = async (req, res) => {
	try {
		let id = req.params.undefined.substring(1);
		let video = await Video.findById(id);
		res.render("editVideo", { video });
	} catch (error) {
		console.log(error);
		res.redirect(routes.home);
	}
};

export let postEditVideo = async (req, res) => {
	try {
		let {
			body: { title, description },
			params: { undefined: id }
		} = req;

		if (req.file == undefined) {
			await Video.findByIdAndUpdate(id.substring(1), {
				title,
				description
			});
		} else {
			await Video.findByIdAndUpdate(id.substring(1), {
				thumbnail: req.file.location,
				title,
				description
			});
		}

		req.flash("success", "수정 성공 😀");
		res.redirect(`/video${routes.videoDetail(id.substring(1))}`);
	} catch (error) {
		req.flash("error", "수정 실패 😥");
		res.redirect(routes.home);
	}
};

// delete video
export let deleteVideo = async (req, res) => {
	try {
		let id = req.params.undefined.substring(1);
		let video = await Video.findById(id);
		let user = await User.findById(video.creator);

		if (video.creator == req.user.id) {
			await video.delete();
			await user.video.splice(user.video.indexOf(video.id), 1);
			user.save();
			req.flash("success", "삭제 성공 😀");
		} else {
			throw Error;
		}
	} catch (error) {
		req.flash("error", "삭제 실패 😥");
	} finally {
		res.redirect(routes.home);
	}
};

// api wrapper

// views
export let views = async (req, res) => {
	try {
		let id = req.params.undefined.substring(1);
		let video = await Video.findById(id);
		await video.views++;
		video.save();
	} catch (error) {
		console.log(error);
	} finally {
		res.end();
	}
};

// comment
export let comment = async (req, res) => {
	try {
		let {
			body: { comment: text },
			user
		} = req;

		let videoId = req.params.undefined.substring(1);
		let video = await Video.findById(videoId);

		let newComment = await Comment.create({
			creator: user.id,
			text
		});

		await video.comment.push(newComment.id);
		await user.comment.push(newComment.id);
		video.save();
		user.save();

		res.send(newComment); //! axios data 객체에 newComment 객체를 보냄
	} catch (error) {
		console.log(error);
	} finally {
		res.end();
	}
};

// delete comment
export let delComment = async (req, res) => {
	try {
		let { user } = req;

		let commentId = req.params.undefined.substring(1);
		let comment = await Comment.findById(commentId);
		let video = await Video.findOne({
			comment: commentId
		});

		if (user.id == comment.creator) {
			await comment.remove();
			await user.comment.splice(user.comment.indexOf(commentId), 1);
			await video.comment.splice(video.comment.indexOf(commentId), 1);
			user.save();
			video.save();
		}
	} catch (error) {
		console.log(error);
	} finally {
		res.end();
	}
};

// like
export let like = async (req, res) => {
	try {
		let user = req.user;
		let videoId = req.params.undefined.substring(1);
		let video = await Video.findById(videoId);

		await user.like.push(videoId);
		await video.like++;
		user.save();
		video.save();
	} catch (error) {
		console.log(error);
	} finally {
		res.end();
	}
};

// toogle like
export let toogleLike = async (req, res) => {
	try {
		let user = req.user;
		let videoId = req.params.undefined.substring(1);
		let video = await Video.findById(videoId);

		await video.like--;
		await user.like.splice(user.like.indexOf(videoId), 1);
		video.save();
		user.save();
	} catch (error) {
		console.log(error);
	} finally {
		res.end();
	}
};

// unlike
export let unlike = async (req, res) => {
	try {
		let user = req.user;
		let videoId = req.params.undefined.substring(1);
		let video = await Video.findById(videoId);

		await user.unlike.push(videoId);
		await video.unlike++;
		user.save();
		video.save();
	} catch (error) {
		console.log(error);
	} finally {
		res.end();
	}
};

// toogle unlike
export let toogleUnlike = async (req, res) => {
	try {
		let user = req.user;
		let videoId = req.params.undefined.substring(1);
		let video = await Video.findById(videoId);

		await video.unlike--;
		await user.unlike.splice(user.unlike.indexOf(videoId), 1);
		video.save();
		user.save();
	} catch (error) {
		console.log(error);
	} finally {
		res.end();
	}
};

// subscribe
export let subscribe = async (req, res) => {
	try {
		let loggedUser = req.user;
		let id = req.params.undefined.substring(1);

		await User.findOne({
			_id: id
		}).exec((err, user) => {
			if (err == null && !(user == null)) {
				loggedUser.subscribe.push(user.id);
				user.follower++;
				loggedUser.save();
				user.save();
			}
		});
	} catch (error) {
		console.log(error);
	} finally {
		res.end();
	}
};

// toogle subscribe
export let toggleSubscribe = async (req, res) => {
	try {
		let loggedUser = req.user;
		let id = req.params.undefined.substring(1);

		await User.findOne({
			_id: id
		}).exec((err, user) => {
			if (err == null && !(user == null)) {
				loggedUser.subscribe.splice(user.subscribe.indexOf(user.id), 1);
				user.follower--;
				loggedUser.save();
				user.save();
			}
		});
	} catch (error) {
		console.log(error);
	} finally {
		res.end();
	}
};
