import mongoose from "mongoose";

let video = new mongoose.Schema({
	file: String,
	thumbnail: String,
	title: String,
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	description: String,
	createAt: {
		type: Date,
		default: Date.now
	},
	comment: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Comment"
		}
	],
	views: {
		type: Number,
		default: 0
	},
	like: {
		type: Number,
		default: 0
	},
	unlike: {
		type: Number,
		default: 0
	}
});

let model = mongoose.model("Video", video);

export default model;
