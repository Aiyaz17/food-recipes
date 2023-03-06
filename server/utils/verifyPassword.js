const bcrypt = require('bcrypt')

const verifyPassword = async (candidatepassword,userPassword)=>{
    
    return await bcrypt.compare(candidatepassword,userPassword)
}

module.exports = verifyPassword
