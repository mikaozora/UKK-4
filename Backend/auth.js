const jwt = require("jsonwebtoken")
const SECRET_KEY = "Lelang"
const SECRET_MASYARAKAT = "hoi"


auth = (req,res,next) =>{
    let header = req.headers.authorization
    let token = header && header.split(" ")[1]

    let jwtHeader ={
        algorithm: "HS256"
    }
    if (token == null) {
        res.status(401).json({message : "Unauthorization"})
    }else{
        jwt.verify(token, SECRET_KEY, jwtHeader, (error,user) => {
            if (error) {
                res
                .status(401)
                .json({
                    message: "Invalid token"
                })
            } else {
                console.log(user);
                // if(user.username == )
                next()
            }
        })
    } 
}
authMasyarakat = (req,res,next) =>{
    let header = req.headers.authorization
    let token = header && header.split(" ")[1]

    let jwtHeader ={
        algorithm: "HS256"
    }
    if (token == null) {
        res.status(401).json({message : "Unauthorization"})
    }else{
        jwt.verify(token, SECRET_KEY, jwtHeader, (error,user) => {
            if (error) {
                res
                .status(401)
                .json({
                    message: "Invalid token"
                })
            } else {
                console.log(JSON.stringify(user));
                next()
            }
        })
    } 
}

module.exports = auth, authMasyarakat