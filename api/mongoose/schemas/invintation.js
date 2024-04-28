const mongoose = require('mongoose')

const InvintationSchema = new mongoose.Schema({
    url: {
        type: mongoose.Schema.Types.String,
        required: true,
        unique: true,
    },
    workspace_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workspace',
        required: true
    },

});


const Invintation = mongoose.model('Invintation', InvintationSchema);

module.exports = Invintation;

