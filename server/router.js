const express = require('express')
const { signup, login, validUser, logout } = require('./controllers/authentication')
const authenticate = require('./middleware/authenticate.middleware')
const { createTodo, getTodo, createTask, deleteToDo, deleteTask, editTask, editTitle, testHome } = require('./controllers/todo.controller')
const router = new express.Router()


router.post('/signup' , signup)
router.post('/login' , login)
router.get('/logout' , logout)
router.get('/', testHome)
router.get('/validUser' , authenticate , validUser)
router.post('/createTodo' , createTodo) //done
router.get('/getTodo/:id' , getTodo) //done
router.post('/createTask/:id' , createTask) // use params
router.delete('/deleteToDo/:id' , deleteToDo) //done
router.put('/deleteTask/:id' , deleteTask) //use params
router.put('/editTask/:id' , editTask) // use params
router.put('/editTitle/:id' , editTitle) //done


module.exports = router
