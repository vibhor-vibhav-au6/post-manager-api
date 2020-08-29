const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    header: {
        type: String,
        required: true,
        trim: true
    },    
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment