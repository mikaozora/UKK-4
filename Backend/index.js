const express = require("express")
const app = express()
const cors = require("cors"), 
    path = require('path')
app.use(cors())

const port = 9090
app.listen(port, () => {
    console.log(`Server run on port ${port}`)
})

app.use('/api/v1/barang_image', express.static(path.join(__dirname,'barang_image')))

app.get("/", (req, res) => {
    res.send("Server Running Properly")
})

const history_lelang = require("./router/history_lelang")
app.use("/api/v1/history_lelang", history_lelang)

const barang = require("./router/barang")
app.use("/api/v1/barang", barang)

const lelang = require("./router/lelang")
app.use("/api/v1/lelang", lelang)

const masyarakat = require("./router/masyarakat")
app.use("/api/v1/masyarakat", masyarakat)

const petugas = require("./router/petugas")
app.use("/api/v1/petugas", petugas)