const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const models = require("../models/index")
const history_lelang = models.history_lelang

app.get("/", async(req, res) => {
    let result = await history_lelang.findAll()
    res.json(result)
})

module.exports = app