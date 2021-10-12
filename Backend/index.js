const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())

const port = 9090
app.listen(port, () => {
    console.log(`Server run on port ${port}`)
})

app.get("/", (req, res) => {
    res.send("Server Running Properly")
})

const history_lelang = require("./router/history_lelang")
app.use("/api/v1/history_lelang", history_lelang)

const tb_barang = require("./router/tb_barang")
app.use("/api/v1/tb_barang", tb_barang)

const tb_lelang = require("./router/tb_lelang")
app.use("/api/v1/tb_lelang", tb_lelang)

const tb_level = require("./router/tb_level")
app.use("/api/v1/tb_level", tb_level)

const tb_masyarakat = require("./router/tb_masyarakat")
app.use("/api/v1/tb_masyarakat", tb_masyarakat)

const tb_petugas = require("./router/tb_petugas")
app.use("/api/v1/tb_petugas", tb_petugas)