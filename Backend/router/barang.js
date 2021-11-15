const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const multer = require('multer')
const fs = require('fs')
const path = require("path")

const barang = require("../models/index").barang
const current = new Date()
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./barang_image")
    },
    filename: (req, file, cb) => {
        cb(null, "img-" + Date.now() + path.extname(file.originalname)) 
    }
})
let upload = multer({ storage: storage })

app.get("/", async (req, res) => {
    await barang.findAll()
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
        id: req.params.id
    }
    await barang.findOne({ where: param })
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

app.post("/", upload.single("image"), async (req, res) => {
    if (!req.file) {
        res.json({
            message: "Anda belum menambahkan gambar barang"
        })
    } else {
        const data = {
            nama_barang: req.body.nama_barang,
            harga_awal: req.body.harga_awal,
            deskripsi: req.body.deskripsi,
            tgl: current,
            image: req.file.filename
        }
        await barang.create(data)
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
    }

})

app.put("/", upload.single('image'), async (req, res) => {
    const param = {
        id: req.body.id
    }
    const data = {
        nama_barang: req.body.nama_barang,
        harga_awal: req.body.harga_awal,
        deskripsi: req.body.deskripsi,
        tgl: current
    }
    if (req.file) {
        const row = await barang.findOne({ where: param })
        const oldFileName = row.image

        // delete old file
        const dir = await path.join(__dirname, "../barang_image", oldFileName)
        fs.unlink(dir, err => console.log(err))
        // set new filename
        data.image = req.file.filename
    }
    await barang.update(data, { where: param })
        .then(result => {
            res.json({
                data: {
                    id_barang: param.id_barang,
                    nama_barang: data.nama_barang,
                    harga_awal: data.harga_awal,
                    deskripsi: data.deskripsi,
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
        id: req.params.id
    }
    let result = await barang.findOne({ where: param })
    let oldFileName = result.image

    // delete old file
    let dir = path.join(__dirname, "../barang_image", oldFileName)
    fs.unlink(dir, err => console.log(err))
    await barang.destroy({ where: param })
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