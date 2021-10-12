const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const models = require("../models/index")
const tb_lelang = models.tb_lelang

app.get("/", async(req, res) => {
    let result = await tb_lelang.findAll()
    res.json(result)
})

module.exports = app