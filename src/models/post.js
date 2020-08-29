const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    like: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }]
}, {
    timestamps: true
})

postSchema.virtual('Comments', {
    ref: 'Comment',
    localField: '_id',
    foreignField: 'post'
})

postSchema.virtual('Likes', {
    ref: 'Like',
    localField: '_id',
    foreignField: 'post'
})

const Post = mongoose.model('Post', postSchema)

module.exports = Post