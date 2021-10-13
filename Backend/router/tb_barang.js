const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const models = require("../models/index")
const tb_barang = models.tb_barang

app.get("/", async (req, res) => {
    await tb_barang.findAll()
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
        id_barang: req.params.id
    }
    await tb_barang.findOne({ where: param })
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
        nama_barang: req.body.nama_barang,
        harga_awal: req.body.harga_awal,
        deskripsi_barang: req.body.deskripsi_barang,
        tgl: Date.now()
    }
    await tb_barang.create(data)
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
        id_barang: req.body.id_barang
    }
    const data = {
        nama_barang: req.body.nama_barang,
        harga_awal: req.body.harga_awal,
        deskripsi_barang: req.body.deskripsi_barang,
        tgl: Date.now()
    }
    await tb_barang.update(data, { where: param })
        .then(result => {
            res.json({
                data: {
                    id_barang: param.id_barang,
                    nama_barang: data.nama_barang,
                    harga_awal: data.harga_awal,
                    deskripsi_barang: data.deskripsi_barang,
                    tgl: data.tgl
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
        id_barang: req.params.id
    }
    await tb_barang.destroy({ where: param })
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