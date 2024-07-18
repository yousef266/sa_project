const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	subject: {
		type: String,
		required: true,
	},
	url: {
		type: String,
		required: true,
	},
	contentType: {
		type: String,
		required: true,
	},
});

const File = mongoose.model("File", fileSchema);

module.exports = File;
