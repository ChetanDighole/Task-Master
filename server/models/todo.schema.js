const mongoose = require('mongoose')
const users = require('./user.schema')

const todoSchema = new mongoose.Schema({
    users:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    title: {
        type: String,
    },
    task: {
        type: [String]
    }

})

module.exports = mongoose.model('todo' , todoSchema)
