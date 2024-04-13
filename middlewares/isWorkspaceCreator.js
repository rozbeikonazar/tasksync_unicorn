const {Workspace} = require('../mongoose/schemas/workspace.js')


const isWorkspaceCreator = async (req, res, next) => {
    // Checks if the user is the creator of the workspace
    const userID = req.user
    const {workspaceID} = req.params
    try{
        const workspace = await Workspace.findOne({ _id: workspaceID, creator_id: userID });   
        if (!workspace) {
            return res.status(403).json({ error: "You don't have permission to perform this action in the workspace." });
        }
        req.workspace = workspace;
        next()
    }
    catch (err) {
        return res.status(500).json({error: "Internal Server Error"})
    }
}

module.exports = isWorkspaceCreator