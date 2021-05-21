const express = require("express");
const app = express()

var loginOperation = require('./Router/loginOperation');

app.use("/",loginOperation)

app.get("/", (req, res) => {
    res.send(req.user)
})

app.listen(3000,() => {
    console.log("Server started")
})