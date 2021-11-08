const express = require("express")
const md5 = require("md5")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const masyarakat = require("../models/index").masyarakat
const jwt = require("jsonwebtoken")
const auth = require("../auth")

app.get("/", auth('petugas', 'admin'), async(req, res) => {
    await masyarakat.findAll()
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

app.get("/:id", auth('petugas', 'admin', 'masyarakat'), async(req, res) => {
    const param = {
        id: req.params.id
    }
    await masyarakat.findOne({ where: param })
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

app.post("/registrasi", async(req, res) => {
    const data = {
        nama: req.body.nama,
        username: req.body.username,
        password: md5(req.body.password),
        telp: req.body.telp
    }
    await masyarakat.create(data)
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

app.put("/", auth('admin', 'masyarakat'), async(req, res) => {
    const param = {
        id: req.body.id
    }
    const data = {
        nama: req.body.nama,
        username: req.body.username,
        telp: req.body.telp
    }
    if (req.body.password) {
        data.password = md5(req.body.password)
    }
    await masyarakat.update(data, { where: param })
        .then(result => {
            res.json({
                data: {
                    id: param.id,
                    nama: data.nama,
                    username: data.username,
                    telp: data.telp
                },
                message: "Data berhasil diupdate"
            })
        }).catch(err => {
            res.json({
                message: err.message
            })
        })
})

app.delete("/:id", auth('admin', 'masyarakat'), async(req, res) => {
    const param = {
        id: req.params.id
    }
    await masyarakat.destroy({ where: param })
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