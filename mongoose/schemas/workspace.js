const mongoose = require("mongoose")

const WorkspaceSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    creator_id: {
        type: mongoose.Schema.ObjectId, ref: "User",
        required: true
    }
})

const Workspace = mongoose.model('Workspace')
module.exports = Workspace;