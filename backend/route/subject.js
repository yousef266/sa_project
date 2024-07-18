/* eslint-disable no-undef */
// Important requires
const express = require("express");
const router = express.Router();

//import Subject modal
const Subject = require("../models/subject");

// get & post methods
router.post("/", async (req, res) => {
	try {
		const subject = new Subject({ ...req.body });
		const result = await subject.save();
		res.send({ status: 200, subjectID: result._id });
	} catch (error) {
		res.send({ status: 401, err: error.message });
	}
});

router.get("/", async (req, res) => {
	const result = await Subject.find();
	res.send({ status: 200, subjects: result });
});

//export router
module.exports = router;
