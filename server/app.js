const express = require('express')
const { signup } = require('./controllers/authentication');
const router = require('./router');
const cors = require('cors');
const cookieParser = require('cookie-parser')


const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(router)

app.listen(4000 , ()=>{
    console.log("server started")
})


module.exports = app
