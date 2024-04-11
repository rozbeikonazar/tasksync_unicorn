const mongoose = require('mongoose')
const Invintation = require("./invintation.js")
const User = require('./user.js')
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



WorkspaceSchema.pre("deleteOne", async function (next) {
    try {  
        workspaceID = this.getQuery()["_id"];
        // Remove related documents from UserWorkspaceInvintation collection
        await UserWorkspaceInvintation.deleteMany({ workspace_id: workspaceID });
        // Remove related documents from Invintation collection
        await Invintation.deleteMany({ workspace_id: workspaceID});
        next();
    } catch (error) {
        next(error);
    }
});

WorkspaceSchema.pre("deleteMany", async function (next) {
    let creator_id = this.getQuery()["creator_id"];
    try {
        // find all workspaces associated with the creator_id
        const workspaces = await Workspace.find({creator_id: creator_id});
        const workspaceIDs = workspaces.map(workspace => workspace._id);
        await Invintation.deleteMany({workspace_id: {$in: workspaceIDs }});
        await UserWorkspaceInvintation.deleteMany({workspace_id: {$in: workspaceIDs}});

        next();   
    }
    catch (error) {
        next(error)
    }
    
});



UserWorkspaceInvintationSchema.index({ user_id: 1, workspace_id: 1}, { unique: true });


const Workspace = mongoose.model('Workspace', WorkspaceSchema)
const UserWorkspaceInvintation = mongoose.model('UserWorkspaceInvintation', UserWorkspaceInvintationSchema)


module.exports = {
    Workspace,
    UserWorkspaceInvintation
};
