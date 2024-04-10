const {Workspace} = require('../mongoose/schemas/workspace.js')

const isWorkspaceCreator = async (req, res, next) => {
    const userID = req.user
    const {workspaceID} = req.params

    try{
        const workspace = await Workspace.findOne({ _id: workspaceID, creator_id: userID });
        
        if (!workspace) {
            return res.status(404).json({ error: "Workspace not found or you are not the creator." });
        }
        req.workspace = workspace;
        next()
    }
    catch (err) {
        return res.status(500).json({error: "Internal Server Error"})
    }
}

module.exports = isWorkspaceCreator