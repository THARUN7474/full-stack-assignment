const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3001;

app.use(bodyParser.json());

const USERS = [];

const QUESTIONS = [
  {
    title: "Two states",
    description: "Given an array, return the maximum of the array?",
    testCases: [
      {
        input: "[1,2,3,4,5]",
        output: "5",
      },
    ],
  },
];

const SUBMISSIONS = [];

app.get("/", function (req, res) {
  res.send("Welcome to the Coding Quiz API!");
});

app.post("/signup", function (req, res) {
  const { email, password } = req.body;

  const userExists = USERS.some((user) => user.email === email);

  if (!userExists) {
    USERS.push({ email, password });
    res.status(200).send("User registered successfully!");
  } else {
    res.status(400).send("User already exists!");
  }
});

app.post("/login", function (req, res) {
  const { email, password } = req.body;

  const user = USERS.find((user) => user.email === email);

  if (user && user.password === password) {
    res.status(200).send({ token: "random-token" });
  } else {
    res.status(401).send("Invalid email or password");
  }
});

app.get("/questions", function (req, res) {
  res.status(200).json(QUESTIONS);
});

app.get("/submissions", function (req, res) {
  res.status(200).json(SUBMISSIONS);
});

app.post("/submissions", function (req, res) {
  const { userId, questionId, code } = req.body;
  const isAccepted = Math.random() < 0.5;
  SUBMISSIONS.push({
    userId,
    questionId,
    code,
    data: submissionData,
    accepted: isAccepted,
    timestamp: new Date(),
  });

  if (isAccepted) {
    res.status(200).json({ message: "Submission accepted successfully" });
  } else {
    res.status(403).json({ message: "Submission rejected" });
  }
});

app.post("/admin/add-problem", function (req, res) {
  const { title, description, testCases, admin } = req.body;

  if (admin) {
    QUESTIONS.push({ title, description, testCases });
    res.status(200).send("Problem added successfully!");
  } else {
    res.status(403).send("Only admins can add problems.");
  }
});

//or else we can make like while login itself we identify admin 
// we can test the routes of your Express server without a UI by using tools like `Postman`, `curl`, or writing automated tests with a testing framework like `Mocha` and `Chai`.

app.listen(port, function () {
  console.log(`Example app listening on port ${port}`);
});
