const express = require("express")
const multer = require("multer")
const cors = require ("cors")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const history_lelang = require("../models/index").history_lelang


app.get("/",async (req,res)=>{
    history_lelang.findAll({
        include:["masyarakat","lelang","barang"]
    })
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

app.get("/:id",async (req,res)=>{
    const param = {
        id_history:req.params.id_history
    }
    history_lelang.findOne({where:param})
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

app.post("/",async (req,res)=>{
    const data ={
        id_lelang:req.body.id_lelang,
        id_barang:req.body.id_barang,
        id_masyarakat:req.body.id_masyarakat,
        penawaran_harga:req.body.penawaran_harga
    }
    history_lelang.create(data)
    .then(result => {
        res.json({
            message: "Data has been Insert",
            data:result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.put("/",async (req,res)=>{
    const param ={
        id:req.params.id
    }
    const data ={
        id_lelang:req.body.id_lelang,
        id_barang:req.body.id_barang,
        id_masyarakat:req.body.id_masyarakat,
        penawaran_harga:req.body.penawaran_harga
    }
    history_lelang.update(data,{where:param})
    .then(result => {
        res.json({
            message: "Data has been Update",
            data:result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.delete("/:id_history",async (req,res)=>{
    const param ={
        id_history : req.params.id_history
    }
    history_lelang.destroy({where:param})
    .then(result=>{
        res.json({
            message:"Data has been Delete"
        })
    })
    .catch(error=>{
        res.json({
            message:error.message
        })
    })
})
module.exports = app
