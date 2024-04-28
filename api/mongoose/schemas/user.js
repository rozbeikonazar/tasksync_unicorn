const mongoose = require('mongoose')
const {Workspace} = require("./workspace.js")

const UserSchema = new mongoose.Schema({
    username: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
        lowercase: true,
    },
    display_name: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    password: {
        type: mongoose.Schema.Types.String,
        required: true
    },
});
UserSchema.pre('deleteOne', async function (next) {
    try {
        let id = this.getQuery()["_id"];        
        await Workspace.deleteMany({creator_id: id});
        next();
    }
    catch (err) {
        next(err);

    }
});


UserSchema.index({ username: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

const User = mongoose.model('User', UserSchema)

module.exports = User;