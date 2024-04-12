const {Workspace, UserWorkspaceInvintation} = require('../mongoose/schemas/workspace.js')


const checkWorkspaceAccess = async (req, res, next) => {
    const userID = req.user
    const {workspaceID} = req.params
    try {
        const workspace = await Workspace.findOne({_id: workspaceID, creator_id: userID})
        if (!workspace){
            const invitedToWorkspace = await UserWorkspaceInvintation.findOne(
                {workspace_id: workspaceID, 
                user_id: userID, })
               
            if (!invitedToWorkspace) {
                return res.status(403).json("You don't have permission to perform this action in the workspace.")

            }}
        next()
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error." });
    }
}

module.exports = checkWorkspaceAccess;