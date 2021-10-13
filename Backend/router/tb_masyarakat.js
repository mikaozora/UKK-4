const express = require("express")
const md5 = require("md5")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const models = require("../models/index")
const tb_masyarakat = models.tb_masyarakat
const jwt = require("jsonwebtoken")
const SECRET_KEY = "Lelang"
const auth = require("../auth")

app.get("/", auth ,async (req, res) => {
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

app.get("/:id", auth, async (req, res) => {
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

app.post("/", auth, async (req, res) => {
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
                message: "Data berhasil ditambahkan"
            })
        }).catch(err => {
            res.json({
                message: err.message
            })
        })
})

app.put("/", auth, async (req, res) => {
    const param = {
        id_user: req.body.id_user
    }
    const data = {
        nama_lengkap: req.body.nama_lengkap,
        username: req.body.username,
        telp: req.body.telp
    }
    if (req.body.password) {
        data.password = md5(req.body.password)
    }
    await tb_masyarakat.update(data, { where: param })
        .then(result => {
            res.json({
                data: {
                    id_user: param.id_user,
                    nama_lengkap: data.nama_lengkap,
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

app.delete("/:id", auth, async (req, res) => {
    const param = {
        id_user: req.params.id
    }
    await tb_masyarakat.destroy({ where: param })
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

app.post("/login", async (req, res) => {
    const param = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let result = await tb_masyarakat.findOne({ where: param })
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