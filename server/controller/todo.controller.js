const Todo = require('../models/Todo');

// @desc   GET all todos for a user
// @route  GET /api/todos
// @access Private
const getTodos = async (req, res, next) => {
    try {
        const todos = await Todo.find({ user: req.user.id });
        res.status(200).json(todos);
    } catch (error) {
        next(error);
    }
}

// @desc   Create a new route
// @route  POST /api/todos
// @access Private
const createTodo = async (req, res, next) => {
    try {
        const { title, description } = req.body;

        if (!title) {
            res.status(400);
            throw new Error("Please add a title");
        }

        const todo = await Todo.create({ userId: req.user.id, title, description });

        res.status(201).json(todo);
    } catch (error) {
        next(error);
    }
}

// @desc   Update a todo
// @route  PUT /api/todos/:id
const updateTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            res.status(404);
            throw new Error("Todo not found");
        }

        const updateTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    } catch (error) {
        next(error);
    }
}

// @desc   Delete a todo
// @route  DELETE /api/todos/:id
// @access Private
const deleteTodo = async (req, res, next) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            res.status(404);
            throw new Error("Todo not found");
        }

        // Check for user
        if (todo.userId.toString() !== req.user.id) {
            res.status(401);
            throw new Error("User not authorized");
        }

        await todo.remove();

        res.status(200).json({ id: req.params.id });
    } catch (error) {
        next(error);
    }
}

module.exports = { getTodos, createTodo, updateTodo, deleteTodo }