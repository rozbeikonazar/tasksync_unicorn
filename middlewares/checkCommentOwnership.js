const {Workspace} = require('../mongoose/schemas/workspace.js')
const Comment = require('../mongoose/schemas/comment.js')

const checkCommentOwnership = async (req, res, next) => {
    const userID = req.userID
    const {workspaceID, taskID, commentID} = req.params

    try {
        const creatorOfWorkspace = await Workspace.findOne({_id: workspaceID, creator_id: userID})
        if (!creatorOfWorkspace) {
            const commentAuthor = await Comment.find({task_id: taskID, commenter_id: commentID})
            if (!commentAuthor) {
                return res.status(403).json("You don't have permission to perform this action.")

            }

        }
        next()
    } catch(err) {
        return res.status(500).json({ message: "Internal server error." });

    }
}


module.exports = checkCommentOwnership;