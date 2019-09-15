import mongoose from "mongoose";

let comment = new mongoose.Schema({
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User"
	},
	createAt: {
		type: Date,
		default: Date.now
	},
	text: String
});

let model = mongoose.model("Comment", comment);

export default model;
