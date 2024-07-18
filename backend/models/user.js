const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	_id: {
		type: String,
		required: true,
	},
	points: {
		type: Number,
		required: true,
	},
	subjects: {
		type: Object,
		required: true,
	},
	totalHours: {
		type: Number,
		required: true,
	},
	totalGpa: {
		type: Number,
		required: true,
	},
	isAdmin: {
		type: Boolean,
		required: true,
	},
});

const User = mongoose.model("User", userSchema);

module.exports = User;
