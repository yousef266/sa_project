/* eslint-disable no-undef */
// Important requires
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// define constants
const PORT = 3001;
const url = "mongodb://localhost:27017/Studently";

// init the Server and connect to the DataBase
const app = express();

mongoose
	.connect(url)
	.then(() =>
		app.listen(PORT, () => {
			console.log("Server is running on " + PORT);
		})
	)
	.catch(() => {
		console.log("error");
	});

app.use(express.json());

// enable requests from other URLs
app.use(cors());

// allow fetching static file
app.use(express.static("data"));

// import routes
const authRoute = require("./route/auth");
const fileRoute = require("./route/file.js");
const questionRoute = require("./route/question");
const quizRoute = require("./route/quiz");
const subjectRoute = require("./route/subject");
const userRoute = require("./route/user");

//use routes
app.use("/auth", authRoute);
app.use("/file", fileRoute);
app.use("/question", questionRoute);
app.use("/quiz", quizRoute);
app.use("/subject", subjectRoute);
app.use("/user", userRoute);

app.get("/", (req, res) => {
	res.send("<h1>Studently backend</h1>");
});
