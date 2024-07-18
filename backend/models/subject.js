const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	hours: {
		type: Number,
		required: true,
	},
});

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
