const models = require('../models/index'),
    barang = require('./barang.json'),
    lelang = require('./lelang.json'),
    masyarakat = require('./masyarakat.json'),
    petugas = require('./petugas.json')

addData = () => {
    let res_barang = models.barang.bulkCreate(barang)
    console.log("insering table barang :")
    res_barang ? console.log('success') : console.log("failed")

    let res_petugas = models.petugas.bulkCreate(petugas)
    console.log("insering table petugas :")
    res_petugas ? console.log('success') : console.log("failed")

    let res_masyarakat = models.masyarakat.bulkCreate(masyarakat)
    console.log("insering table masyarakat :")
    res_masyarakat ? console.log('success') : console.log("failed")

    let res_lelang = models.lelang.bulkCreate(lelang)
    console.log("insering table lelang :")
    res_lelang ? console.log('success') : console.log("failed")

}
addData()