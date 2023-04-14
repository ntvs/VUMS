const mongoose = require('mongoose');

const videoFileSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    mimetype: {
        type: String,
        required: true
    },
    size: {
        type: Number,
        required: true
    },
    // owner: {
    //     type: mongoose.Types.ObjectId,
    //     required: true
    // }
});

module.exports = mongoose.model('VideoFile', videoFileSchema);