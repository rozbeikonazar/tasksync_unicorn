const express = require('express');
const router = express.Router();
const checkAuth = require('../middlewares/checkAuth');
const handleValidationErrors = require("../middlewares/handleValidationErrors.js")
const isWorkspaceCreator = require("../middlewares/isWorkspaceCreator.js")
const {createWorkspaceValidationSchema} = require('../helpers/validationSchemas.js')
const { checkSchema, matchedData} = require('express-validator');
const {Workspace, UserWorkspaceInvintation} = require('../mongoose/schemas/workspace.js')
const mongoose = require('mongoose')




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
        const result = await Workspace.deleteOne({_id: req.workspace._id, creator_id: req.workspace.creator_id});
        if (result) {
            res.status(200).json({ message: `Workspace deleted successfully.`});
        } else {
            res.status(500).json({ error: "Workspace deletion failed." });
        }
    } catch (error) {
        console.error("Error deleting workspace:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



router.post('/:workspaceID/generate_invintation',
    isWorkspaceCreator, async function(req, res) {
        

    }
)


router.post('/accept_invite', async function(req, res) {
    // 6616813fd068cddc029d248c
       const userID = req.user._id
       const workspaceID = new mongoose.Types.ObjectId("6616813fd068cddc029d248c");
        try{
            const newJoin = new UserWorkspaceInvintation({
                user_id: userID,
                workspace_id: workspaceID
            })
            const joinToWorkspace = await newJoin.save({
    
        })
        return res.status(200).json(joinToWorkspace)
    }   catch (err) {
        console.log(err)
        return res.status(500).json({err})
    
    } 
    })
    

module.exports = {
    router,
}