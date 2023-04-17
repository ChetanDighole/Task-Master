
const jwt = require('jsonwebtoken')
const users = require('../models/user.schema')

const authenticate = async (req , res , next) => {
    try {
        
        const token = req.headers.authorization || req.cookies.token
        
        if(!token){
            throw new Error('Cookie not found');
        }

        const decodeToken = await jwt.verify(token , process.env.JWT_SECRETE_KEY);
        // console.log(decodeToken,"!@#$%^&")
        

        const rootUser = await users.findOne({_id:decodeToken._id})

        if(!rootUser){
            console.log('user not found at middleware')
        }

        req.user = rootUser

        next();

    } catch (error) {
        console.log(error)
        console.error("error at middleware")
        res.status(401).json({status:401 , message:"Unauthorized no token provided"})

    }
}

module.exports = authenticate
