const jwt=require("jsonwebtoken")
const genAuthToken=(_id,name,lastName,email,isAdmin)=>{
    return jwt.sign({_id,name,lastName,email,isAdmin},
        process.env.JWT_SEC_KEY,
        {expiresIn:"7h"}
        )

}

module.exports=genAuthToken