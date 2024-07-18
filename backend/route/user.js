/* eslint-disable no-undef */
// Important requires
const express = require("express");
const router = express.Router();

//import User modal
const User = require("../models/user");

// get & post methods
router.post("/", async (req, res) => {
	const user = { ...req.body };
	const isExist = await User.exists({ _id: user._id });
	let result;
	if (isExist)
		result = await User.findByIdAndUpdate(user._id, user, { new: true });
	else {
		try {
			const userQuery = new User({ ...req.body });
			result = await userQuery.save();
		} catch (error) {
			res.send({ status: 401, err: error.message });
		}
	}
	res.send({ status: 200, user: result._id });
});

router.get("/:id", async (req, res) => {
	const id = req.params.id;
	const user = await User.findById(id);
	res.send({ status: 200, user });
});

//export router
module.exports = router;
