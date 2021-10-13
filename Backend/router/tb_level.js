const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const models = require("../models/index")
const tb_level = models.tb_level

app.get("/", async(req, res) => {
    await tb_level.findAll()
    .then(result => {
        res.json({
            data: result
        })
    }).catch(err => {
        res.json({
            message: err.message
        })
    })
})

app.get("/:id", async(req, res) => {
    const param = {
        id_level: req.params.id
    }
    await tb_level.findOne({where: param})
    .then(result => {
        res.json({
            data: result
        })
    }).catch(err => {
        res.json({
            message: err.message
        })
    })
})

app.post("/", async(req, res) => {
    const data = {
        level: req.body.level
    }
    await tb_level.create(data)
    .then(result => {
        res.json({
            data: result,
            message: "Data berhasil ditambahkan"
        })
    }).catch(err => {
        res.json({
            message: err.message
        })
    })
})

app.put("/", async(req, res) => {
    const param = {
        id_level: req.body.id_level
    }
    const data = {    
        level: req.body.level
    }
    await tb_level.update(data, {where: param})
    .then(result => {
        res.json({
            data: {
                id_level: param.id_level,
                level: data.level
            },
            message: "Data berhasil diupdate"
        })
    }).catch(err => {
        res.json({
            message: err.message
        })
    })
})

app.delete("/:id", async(req, res) => {
    const param = {
        id_level: req.params.id
    }
    await tb_level.destroy({where:param})
    .then(result => {
        res.json({
            message: "Data berhasil dihapus"
        })
    }).catch(err => {
        res.json({
            message: err.message
        })
    })
})

module.exports = app