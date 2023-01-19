const express = require('express')
const todoController = require('../controllers/todoController')
const router = express.Router()

router.post('/',todoController.createTodo)
router.get('/',todoController.getAllTodo)
router.put('/:id',todoController.updateTodo)
router.delete('/:id',todoController.deleteTodo)
console.log('route')
module.exports = router