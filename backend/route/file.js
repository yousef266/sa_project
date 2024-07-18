/* eslint-disable no-undef */
// Important requires
const express = require("express");
const router = express.Router();
const { upload } = require("../middleware/multer");
const fs = require("node:fs");

//import File modal
const File = require("../models/file");

// get & post methods
router.post("/", upload, async (req, res) => {
	const dir = req.body.dir;
	const ogName = req.file.originalname;
	const contentType = req.file.mimetype;
	const url = `${dir}/${ogName}`;
	var oldPath = "./data/" + ogName;
	var newPath = `./data/${dir}/`;

	const isRepeated = await File.findOne({ url });
	if (isRepeated === null) {
		const file = new File({
			name: ogName,
			subject: dir,
			url,
			contentType,
		});
		try {
			await file.save();
		} catch (error) {
			res.send({ status: 401, err: error.message });
		}
	}

	if (!fs.existsSync(newPath)) fs.mkdirSync(newPath);
	fs.rename(oldPath, newPath + ogName, () => {});

	res.send({ state: 200 });
});

router.get("/:id", async (req, res) => {
	const id = req.params.id;
	const result = await File.find({ subject: id });
	res.send({ status: 200, files: result });
});

//export router
module.exports = router;
