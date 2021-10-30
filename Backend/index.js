const express = require("express"),
    app = express(),
    cors = require("cors"),
    path = require("path"),
    api = "/api/v1"
app.use(cors())
const scheduler = require("./scheduler")
const port = 9090
app.listen(port, () => {
    console.log(`Server run on port ${port}`)
})
scheduler()
app.use(
    `${api}/barang_image`,
    express.static(path.join(__dirname, `barang_image`))
)

app.get(`/`, (req, res) => {
    res.send(`Server Running Properly`)
})

const history_lelang = require(`./router/history_lelang`)
app.use(`${api}/history_lelang`, history_lelang)

const barang = require(`./router/barang`)
app.use(`${api}/barang`, barang)

const {lelang} = require(`./router/lelang`)
app.use(`${api}/lelang`, lelang)

const masyarakat = require(`./router/masyarakat`)
app.use(`${api}/masyarakat`, masyarakat)

const petugas = require(`./router/petugas`)
app.use(`${api}/petugas`, petugas)

const login = require(`./router/login`)
app.use(`${api}/login`, login)