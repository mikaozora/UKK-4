const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const models = require("../models/index")
const tb_petugas = models.tb_petugas

app.get("/", async(req, res) => {
    let result = await tb_petugas.findAll()
    res.json(result)
})

module.exports = app