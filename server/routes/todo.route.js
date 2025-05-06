const express = require('express');
const router = express.Router();
const { getTodos, createTodo, updateTodo, deleteTodo } = require('../controller/todo.controller');
const { authenticateUser } = require('../middleware/authMiddleware');

router.route('/').get(authenticateUser, getTodos).post(authenticateUser, createTodo);
router.route('/:id').put(authenticateUser, updateTodo).delete(authenticateUser, deleteTodo);

module.exports = router;