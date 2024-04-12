const mongoose = require('mongoose')


const CommentSchema = new mongoose.Schema({
    content: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    created_at: {
        type: mongoose.Schema.Types.Date,
        default: Date.now,
    },
    task_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        required: true
    },
    commenter_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

})


const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;