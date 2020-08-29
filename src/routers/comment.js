const express = require('express')
const Comment = require('../models/comment')
const auth = require('../middleware/auth')
// const { replaceOne } = require('../models/comment')
const router = new express.Router()

router.post('/comment/:id', auth, async (req, res) => {

    const comment = new Comment({
        ...req.body,
        author: req.user._id,
        post: req.params.id
    })
    try {
        await comment.save()
        res.status(201).send(comment)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/comment/:id', auth, async (req, res) => {
    const id = req.params.id
    try {
        const comment = await Comment.find({post: id})
        res.send(comment)
    } catch (e) {
        res.status(500).send()
    }
})

// router.get('/posts/:id', auth, async (req, res) => {
//     const _id = req.params.id

//     try {
//         const comment = await comment.findOne({ _id, author: req.user._id })

//         if (!comment) {
//             return res.status(404).send()
//         }

//         res.send(comment)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// router.patch('/posts/:id', auth, async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['description', 'completed']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//     try {
//         const comment = await comment.findOne({ _id: req.params.id, author: req.user._id})

//         if (!comment) {
//             return res.status(404).send()
//         }

//         updates.forEach((update) => comment[update] = req.body[update])
//         await comment.save()
//         res.send(comment)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

router.delete('/comment/:id', auth, async (req, res) => {
    try {
        const comment = await Comment.findOneAndDelete({ _id: req.params.id, author: req.user._id })

        if (!comment) {
            res.status(404).send()
        }

        res.send(comment)
    } catch (e) {
        res.status(500).send()
    }
});

// router.post("/comment/like/:id", auth, async (req, res) => {
//     try {
//       const comment = await Comment.findById({ _id: req.params.id });
//       if (!comment) {
//         res.status(404).send();
//       }
//       likes = [...comment.like, req.user._id];
//       await Comment.findByIdAndUpdate(req.params.id, { like: likes });
//       res.send(typeof likes);
//     } catch (e) {
//       res.status(500).send();
//     }
//   });

module.exports = router