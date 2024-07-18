/* eslint-disable no-undef */
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
	destination: async function (req, file, cb) {
		return cb(null, "./data");
	},
	filename: async function (req, file, cb) {
		const fileName = path.basename(file.originalname).toLowerCase();
		return cb(null, fileName);
	},
});

const upload = multer({
	storage,
	limits: { fileSize: 10485760 },
	fileFilter: async function (req, file, cb) {
		checkFileType(file, cb);
	},
}).single("file");

// Check file Type
function checkFileType(file, cb) {
	// Allowed ext
	const fileTypes = /jpeg|jpg|png|gif|pdf/;
	// Check ext
	const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
	const mimeType = fileTypes.test(file.mimetype);

	if (mimeType && extName) {
		return cb(null, true);
	} else {
		cb("Error: unsuported file !!!");
	}
}

// const upload =  multer({ dest: "uploads/" }).single("file");

module.exports = { upload };
