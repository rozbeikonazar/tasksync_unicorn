const mongoose = require('mongoose')

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
UserSchema.index({ username: 1 }, { unique: true, collation: { locale: 'en', strength: 2 } });

const User = mongoose.model('User', UserSchema)

module.exports = User;