const LelangStatus = require('./router/lelang.enum')
const {check} = require("./router/lelang")
const lelang = require("./models/index").lelang

async function start(){
    let result = await lelang.findAll({where:{status:LelangStatus.DIBUKA}})
    const data = []
    result.forEach(element => {
        data.push(element.dataValues)
    });

    if(data){
        data.forEach(async e=>{
            
                if(e.endTime !== null)
                { 
                    const endTime = new Date(e.endTime).getTime()
                     await check('*/30 * * * * *',endTime,e.id)  
                }
                else {
                       await lelang.update({status:LelangStatus.DITUTUP},{where:{id:e.id}})
                } 
        })
    }
}
module.exports = start