const LelangStatus = require('./router/lelang.enum')
const {check} = require("./router/lelang")
const lelang = require("./models/index").lelang
const redis = require("./redis")

async function start(){
    let result = await lelang.findAll({where:{status:LelangStatus.DIBUKA}})
    const data = []
    result.forEach(element => {
        data.push(element.dataValues)
    });
    if(data){
        data.forEach(e=>{
            redis.get(`${e.id}`,async(err,reply)=>{
                if(reply !== null)
                { 
                     await check('*/30 * * * * *',Number(reply),e.id)
                    
                }
                else {
                       await lelang.update({status:LelangStatus.DITUTUP},{where:{id:e.id}})
                }
            })
        })
    }
}
module.exports = start