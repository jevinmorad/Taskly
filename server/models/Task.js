const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    completed: {
        type: Boolean,
        required: true,
    },
    due_date: {
        type: Date,
        required: true,
    },
    priority: {
        type: String,
    },
    tags: {
        type: [Schema.Types.String],
    },
    subtask: [
        {
            title: {
                type: String,
                required: true,
            },
            completed: {
                type: Boolean,
                required: true,
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