const mongoose = require('mongoose')

const WorkspaceSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.String,
        required: true,
    },
    creator_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

});

const UserWorkspaceInvintationSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    workspace_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true
    }
})

const Workspace = mongoose.model('Workspace', WorkspaceSchema)
const UserWorkspaceInvintation = mongoose.model('UserWorkspaceInvintation', UserWorkspaceInvintationSchema)

module.exports = {
    Workspace,
    UserWorkspaceInvintation
};