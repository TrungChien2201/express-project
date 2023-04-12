const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const app = express();
const path = require("path");

const User = require("./models/user-model");

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Headers", "Content-Type");
	res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
	next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname + "/static"));
app.get("/", function (request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + "/index.html"));
});

app.post("/login", async function (request, response) {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		const data = User.findOne({ username, password });

		// If the account exists
		if (data) {
			// Authenticate the user
			response.send("Login success");
		} else {
			response.send("Incorrect Username and/or Password!");
		}
		response.end();
	} else {
		response.send("Please enter Username and Password!");
		response.end();
	}
});

app.listen(3000);
db.on("error", console.error.bind(console, "MongoDB connection error:"));
