const bcrypt=require("bcryptjs")
const salt=bcrypt.genSaltSync(10)
const hashPassword=password=>{
    return bcrypt.hashSync(password,salt)
}
const comparePassword=(password,hashpassword)=>{
    
    return bcrypt.compareSync(password,hashpassword)
}

module.exports={hashPassword,comparePassword}