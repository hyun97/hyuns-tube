import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

let user = new mongoose.Schema({
	name: String,
	email: String,
	avatarUrl: String,
	googleId: {
		type: Number
	},
	naverId: {
		type: Number
	},
	video: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Video"
		}
	],
	comment: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	],
	like: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Video"
		}
	],
	unlike: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Video"
		}
	],
	subscribe: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		}
	],
	follower: {
		type: "Number",
		default: 0
	},
	history: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Video"
		}
	]
});

user.plugin(passportLocalMongoose, { usernameField: "name" });

// usernameField 변경 에러 방지
user.statics.serializeUser = () => (user, cb) => cb(null, user.id);
user.statics.deserializeUser = function() {
	const self = this;
	return (id, cb) => self.findById(id, cb);
};

let model = mongoose.model("User", user);

export default model;
