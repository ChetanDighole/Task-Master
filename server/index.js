const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const app = require('./app')



mongoose.connect( process.env.MONGODB_URL , {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=> console.log("database connected")).catch((error)=>{
    console.log(error)
})
