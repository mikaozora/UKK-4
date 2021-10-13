const express = require("express")
const md5 = require("md5")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const models = require("../models/index")
const tb_masyarakat = models.tb_masyarakat

app.get("/", async (req, res) => {
    await tb_masyarakat.findAll()
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

app.get("/:id", async (req, res) => {
    const param = {
        id_user: req.params.id
    }
    await tb_masyarakat.findOne({ where: param })
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

app.post("/", async (req, res) => {
    const data = {
        nama_lengkap: req.body.nama_lengkap,
        username: req.body.username,
        password: md5(req.body.password),
        telp: req.body.telp
    }
    await tb_masyarakat.create(data)
        .then(result => {
            res.json({
                data: result,
                message: "data berhasil ditambahkan"
            })
        }).catch(err => {
            res.json({
                message: err.message
            })
        })
})

app.put("/", async (req, res) => {
    const param = {
        id_user: req.body.id_user
    }
    const data = {
        nama_lengkap: req.body.nama_lengkap,
        username: req.body.username,
        password: md5(req.body.password),
        telp: req.body.telp
    }
    await tb_masyarakat.update(data, { where: param })
        .then(result => {
            res.json({
                data: {
                    id_user: param.id_user,
                    nama_lengkap: data.nama_lengkap,
                    username: data.username,
                    password: data.password,
                    telp: data.telp
                },
                message: "data berhasil diupdate"
            })
        }).catch(err => {
            res.json({
                message: err.message
            })
        })
})

app.delete("/:id", async (req, res) => {
    const param = {
        id_user: req.params.id
    }
    await tb_masyarakat.destroy({ where: param })
        .then(result => {
            res.json({
                message: "data berhasil dihapus"
            })
        }).catch(err => {
            res.json({
                message: err.message
            })
        })
})

module.exports = app