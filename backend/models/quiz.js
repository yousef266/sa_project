const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const quizSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	sub: {
		type: String,
		required: true,
	},
	questions: {
		type: Array,
		required: true,
	},
});

const Quiz = mongoose.model("Quiz", quizSchema);

module.exports = Quiz;
