const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const models = require("../models/index")
const tb_petugas = models.tb_petugas

const md5 = require("md5")
const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "Lelang"

app.get("/", async (req, res) => {
    tb_petugas.findAll({
        include:["tb_level"]
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

app.get("/:id", async (req, res) => {
    const param = {
        id_petugas: req.params.id
    }
    await tb_petugas.findOne({ where: param })
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

app.post("/",async (req,res)=>{
    const data ={
        nama_petugas:req.body.nama_petugas,
        username:req.body.username,
        password:md5(req.body.password),
        id_level:req.body.id_level
    }
    tb_petugas.create(data)
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
        id_petugas:req.body.id_petugas
    }
    const data ={
        nama_petugas:req.body.nama_petugas,
        username:req.body.username,
        id_level:req.body.id_level
    }
    if (req.body.password) {
        data.password = md5(req.body.password)
    }
    tb_petugas.update(data,{where : param})
    .then(result =>{
        res.json({
            message:"Data has been Update"
        })
    })
    .catch(error =>{
        res.json({
            message:error.message
        })
    })
})

app.delete("/:id_petugas",async (req,res)=>{
    const param ={
        id_petugas:{id_petugas : req.body.id_petugas}
    }
    tb_petugas.destroy({where:param})
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

app.post("/auth", async (req,res) => {
    const param = {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let result = await petugas.findOne({where: param})
    if(result){
        let payload = JSON.stringify(result)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token
        })
    }else{
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})
module.exports = app
