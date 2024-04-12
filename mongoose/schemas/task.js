const mongoose = require('mongoose')
const Comment = require("./comment.js")

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

TaskSchema.pre("deleteOne", async function(next) {
    const taskID =  this.getQuery()["_id"]
    try {
        await Comment.deleteMany({task_id: taskID})
        next()
    } catch (err) {
        next(err);
    }
    
})

TaskSchema.pre("deleteMany", async function(next) {
    const workspaceIDs = this.getQuery().workspace_id['$in'];    
    try {
        const tasks = await Task.find({workspace_id: {$in : workspaceIDs}})
        const taskIDs = tasks.map(task => task._id)
        console.log("TaskIDS: ", taskIDs)
        await Comment.deleteMany({task_id: {$in: taskIDs}})
        
        next()
    } catch (err) {
        next(err);
    }


} )

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;