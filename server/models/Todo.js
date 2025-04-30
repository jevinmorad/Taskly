const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    title: {
        type: String,
        required: [true, 'Please add a title'],
    },
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    due_date: {
        type: Date,
        required: true,
    },
    priority: {
        type: String,
    },
    tags: {
        type: [mongoose.Schema.Types.String],
    },
    subtask: [
        {
            title: {
                type: String,
                required: [true, 'Please add a title for subtask'],
            },
            completed: {
                type: Boolean,
                default: false
            }
        }
    ],
    reminder: {
        type: Date,
    },
    repeat: {
        type: String,
    }
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);