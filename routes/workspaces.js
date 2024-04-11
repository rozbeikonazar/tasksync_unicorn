const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const handleValidationErrors = require("../middlewares/handleValidationErrors.js")
const isWorkspaceCreator = require("../middlewares/isWorkspaceCreator.js")
const {createWorkspaceValidationSchema} = require('../helpers/validationSchemas.js')
const { checkSchema, matchedData} = require('express-validator');
const {Workspace, UserWorkspaceInvintation} = require('../mongoose/schemas/workspace.js')
const Invintation = require("../mongoose/schemas/invintation.js")
const { v4: uuidv4 } = require('uuid');
const HOST = process.env.HOST || 'localhost:3000';
const WORKSPACE_PREFIX = process.env.WORKSPACE_PREFIX || '/api/workspaces/'

router.post("/", 
checkAuth, 
checkSchema(createWorkspaceValidationSchema), 
handleValidationErrors, 
async function(req, res){
    // Creates new workspace
    const data = matchedData(req);
    const userID = req.user._id
    try {
        const newWorkspace = new Workspace({
            name: data.name,
            creator_id: userID
        });
        const savedWorkspace = await newWorkspace.save();
        return res.status(201).json(savedWorkspace);
    }
    catch (err){
        if (err.name === 'ValidationError'){
            return res.status(422).json({ error: "Validation failed" });
        }
        return res.status(500).json({ error: "Internal Server Error" });    
    }
})



router.get("/", checkAuth, async function(req, res){
    // returns all workspaces assigned to user
    try {
        const userID = req.user._id
        const workspacesCreator = await Workspace.find({creator_id: userID})
        const workspaceInvitations = await UserWorkspaceInvintation.find({user_id: userID}).populate('workspace_id')
        const workspacesInvited = workspaceInvitations.map(invitation => invitation.workspace_id);

        // Merge both arrays to get all workspaces the user belongs to
        const allWorkspaces = [...workspacesCreator, ...workspacesInvited];
        res.status(200).json(allWorkspaces);
    }
    catch (err){
        return res.status(500).json({ error: "Internal Server Error" });
    }

})

router.delete("/:workspaceID", checkAuth, isWorkspaceCreator, async function(req, res) {
    try {
        const result = await Workspace.deleteOne({_id: req.workspace._id});
        if (!result) {
            res.status(500).json({ error: "Workspace deletion failed." });
        }
        res.status(200).json({ message: `Workspace deleted successfully.`});

        
    } catch (err) {
        console.error("Error deleting workspace:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

router.delete("/:workspaceID/quit", checkAuth, async function(req, res) {
    const userID = req.user._id;
    const workspaceID = req.params.workspaceID;
    try {
    const workspace = await Workspace.findOne({ _id: workspaceID, creator_id: userID });
    if (workspace) {
        return res.status(400).json({error: "User is the creator of the workspace. You can delete workspace, but not quit it"})
    }
    const result = await UserWorkspaceInvintation.deleteOne({user_id: userID, workspace_id: workspaceID})

    if (!result) {
        res.status(400).json({error: "Could not quit from workspace or you are not a member of this workspace"})
    }
    res.status(200).json({message: 'Sucessfully quit from workspace'})

    } catch (err) {
        res.status(500).json({error: "Internal Server Error"});
    }

}) 

router.delete("/:workspaceID/kick/:userID", checkAuth, isWorkspaceCreator, async function(req,res) {
    userID = req.params.userID
    const workspaceID = req.params.workspaceID;
    const result = await UserWorkspaceInvintation.deleteOne({user_id: userID, workspace_id: workspaceID});
    if (!result) {
        res.status(400).json({error: "Could not kick a user or he is not a member of workspace"})
    }
    res.status(200).json({message: "Sucessfully kicked user from workspace"})

})


router.post('/:workspaceID/generate_invintation',
    isWorkspaceCreator, async function(req, res) {
        const invitationLink = `${HOST}${WORKSPACE_PREFIX}${uuidv4()}/join`;        
        
        try {
            
            const newInvintation = new Invintation({
                url: invitationLink,
                workspace_id: req.workspace._id
            });
            const savedLink = await newInvintation.save();
            return res.status(201).json({"link": savedLink})
        }
        catch (err){
            console.log(err);
            res.status(500).json({error: "Internal Server Error"});
        }
    }
)


router.post('/:uuid/join', checkAuth, async function(req, res) {
    // by accessing this link, user accept invite
    // and will be add to DB
    // Because I have added index that ensures uniqueness combination of user_id and workspace_id
    // I don't have to check if user is already in that workspace.
    const userID = req.user._id
        try{
            const invitation = await Invintation.findOne({ url: `${HOST}${WORKSPACE_PREFIX}${req.params.uuid}/join` });
            if (!invitation) {
                return res.status(404).json({error: "Invintation not found"})
            }
            // check if user is creator of the workspace
            const workspace = await Workspace.findOne({ _id: invitation.workspace_id, creator_id: userID });
            if (workspace) {
                return res.status(400).json({error: "User is the creator of the workspace"})

            }
            // if all checks pass, we can add user to the workspace

            const newJoin = new UserWorkspaceInvintation({
                user_id: userID,
                workspace_id: invitation.workspace_id
            })

            const joinToWorkspace = await newJoin.save({
    
        })
        // This invintation links are one-time, so after user joined to a workspace
        // this link should be deleted
        const result = await Invintation.deleteOne(invitation._id)
        if (!result) {
            console.error(`Invintation with ID: ${invitation._id} was not deleted`)
            return res.status(500).json({error: "Internal server error"})
        }
        return res.status(200).json(joinToWorkspace)
    }   catch (err) {
        if (err.code === 11000) {
            return res.status(422).json({ error: 'User is already a member of this workspace.'});
        }
        return res.status(500).json({error: "Internal server error"})
    
    } 
    })

module.exports = {
    router,
}