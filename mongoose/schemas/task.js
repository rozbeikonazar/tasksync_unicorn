const mongoose = require('mongoose')


const TaskSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    description: {
        type: mongoose.Schema.Types.String,
        default: null
    },
    deadline: {
        type: mongoose.Schema.Types.Date,
        default: null
    },
    status: {
        type: mongoose.Schema.Types.String,
        enum: ["Done", "In progress", "Not started"],
        default: "Not started"
    },
    assignee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    workspace_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
        required: true
    }

})

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;