const mongoose = require('mongoose')
const bycrpt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        // minLength: 8,
        // select: false
    },
    token: {
        type: String
    }
})

userSchema.pre('save' , async function(next){
    this.password = await bycrpt.hash(this.password , 12)
    next()
})


userSchema.methods = {

    getJWTToken : async function () {

        return await jwt.sign({_id:this._id , email:this.email} , process.env.JWT_SECRETE_KEY , {expiresIn : '1d'})
        
    },

    comparePassword : async function(enteredPassword){
        return await bycrpt.compare(enteredPassword , this.password)
    }

}


module.exports = mongoose.model('users' , userSchema)
