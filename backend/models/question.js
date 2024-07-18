/* eslint-disable no-undef */
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const questionSchema = new Schema({
	courseName: {
		type: String,
		required: true,
	},
	question: {
		type: String,
		required: true,
	},
	answer: {
		type: String,
	},
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
