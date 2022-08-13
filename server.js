const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3000;

app.use(cors());

app.use(express.static('public'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/", (req, res) => {
    res.send("Hey hey. nothing here but a simple server.");
});

let data;

app.put("/save", (req, res) => {
    console.log("Got body:", req.body);
    data = req.body;

    res.sendStatus(200);
});

app.get("/data", (req, res) => {
    res.json(data);
});

app.listen(port, () => {
    console.log(`Homework app listening at http://localhost:${port}`);
});
