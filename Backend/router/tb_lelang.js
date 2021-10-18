const express = require("express")
const multer = require("multer")
// const { ENUM } = require("sequelize/types")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const models = require("../models/index")
const tb_lelang = models.tb_lelang
const tb_history = models.history_lelang

app.get("/", async (req, res) => {
    await tb_lelang.findAll()
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
app.get("/:id", async (req, res) => {
    const param = {
        id_lelang: req.params.id
    }
    await tb_lelang.findOne({ where: param })
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
    let current = new Date().toISOString().split('T')[0]
    let data = {
        id_barang: req.body.id_barang,
        tgl_lelang: current,
        harga_akhir: req.body.harga_akhir,
        id_user: req.body.id_user,
        id_petugas: req.body.id_petugas,
        status: req.body.status 
    }
    tb_lelang.create(data)
    .then(result => {
        res.json({
            message: "Data berhasil ditambahkan",
            data: result
        })
    })
        .catch(error => {
            res.json({
                message: error.message
            })
        })

})
app.put("/", async (req, res) => {
    let param = {
        id_lelang: req.params.id_lelang
    }
    let data = {
        id_barang: req.body.id_barang,
        tgl_lelang: current,
        harga_akhir: req.body.harga_akhir,
        id_user: req.body.id_user,
        id_petugas: req.body.id_petugas,
        status: ENUM("dibuka", "ditutup")
    }
    tb_lelang.update(data, { where: param })
        .then(result => {
            res.json({
                message: "Data has been Update",
                data: result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.delete("/:id_lelang", async (req, res) => {
    let param = {
        id_lelang: req.params.id_lelang
    }
    tb_lelang.destroy({ where: param })
        .then(result => {
            res.json({
                message: "Data has been Delete"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})
module.exports = app
