const express = require("express")
const multer = require("multer")
// const { ENUM } = require("sequelize/types")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const lelang = require("../models/index").lelang
const history_lelang = require("../models/index").history_lelang


app.get("/", async (req, res) => {
    await lelang.findAll()
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
    await lelang.findOne({ where: param })
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
        id_masyarakat: req.body.id_masyarakat,
        id_petugas: req.body.id_petugas,
        status: req.body.status 
    }
    lelang.create(data)
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
        id_masyarakat: req.body.id_masyarakat,
        id_petugas: req.body.id_petugas,
        status: ENUM("dibuka", "ditutup")
    }
    lelang.update(data, { where: param })
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
    lelang.destroy({ where: param })
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
