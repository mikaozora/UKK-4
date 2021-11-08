const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
let SECRET_KEY = "Lelang"
const model = require("../models/index")
const petugas = model.petugas
const masyarakat = model.masyarakat

const md5 = require("md5")
const jwt = require("jsonwebtoken")


app.post("/", async (req, res) => {
    const param = {
        username: req.body.username,
        password: md5(req.body.password)
    }
    let result
    if (
        req.body.level == null ||
        req.body.level == "" ||
        req.body.level == undefined
    ) {
        result = await masyarakat.findOne({ where: param })
        
        if(result){
            result.dataValues.level = 'masyarakat'
            console.log(result);
        }
        
    } else if (req.body.level == "petugas" || req.body.level == "admin") {
        param.level = req.body.level
        result = await petugas.findOne({ where: param })
        console.log(result);
    }
    if (result) {
        let payload = JSON.stringify(result)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            token: token,
        })
    } else {
        res.json({
            logged: false,
            message: "Invalid username or password",
        })
    }
})

module.exports = app