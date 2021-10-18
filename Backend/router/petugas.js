const express = require("express")
const multer = require("multer")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const petugas = require("../models/index").petugas

const md5 = require("md5")
const auth = require("../auth")
const jwt = require("jsonwebtoken") 
const SECRET_KEY = "Lelang"

app.get("/", auth, async (req, res) => {
    await petugas.findAll()
        .then(result => {
            res.json({
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.get("/:id", auth, async (req, res) => {
    const param = {
        petugas: req.params.id
    }
    await petugas.findOne({ where: param })
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

app.post("/", auth, async (req, res) => {
    const data = {
        nama_petugas: req.body.nama_petugas,
        username: req.body.username,
        password: md5(req.body.password),
        level: req.body.level
    }
    await petugas.create(data)
        .then(result => {
            res.json({
                data: result,
                message: "Data berhasil ditambahkan"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.put("/", auth, async (req, res) => {
    const param = {
        id: req.body.id
    }
    const data = {
        nama_petugas: req.body.nama_petugas,
        username: req.body.username,
        level: req.body.level
    }
    if (req.body.password) {
        data.password = md5(req.body.password)
    }
    petugas.update(data, { where: param })
        .then(result => {
            res.json({
                data: {
                    nama_petugas: data.nama_petugas,
                    username: data.username,
                    level: data.level
                },
                message: "Data berhasil diupdate"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.delete("/:id", auth, async (req, res) => {
    const param = {
        petugas: req.params.id
    }
    petugas.destroy({ where: param })
        .then(result => {
            res.json({
                message: "Data berhasil dihapus"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.post("/petugas/login", async (req, res) => {
    const param = {
        username: req.body.username,
        password: md5(req.body.password),
        level: "petugas"
    }
    let result = await petugas.findOne({ where: param })
    if (result) {
        let payload = JSON.stringify(result)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    } else {
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})

app.post("/admin/login", async (req, res) => {
    const param = {
        username: req.body.username,
        password: md5(req.body.password),
        level: "admin"
    }

    let result = await petugas.findOne({ where: param })
    if (result) {
        let payload = JSON.stringify(result)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    } else {
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})


module.exports = app
