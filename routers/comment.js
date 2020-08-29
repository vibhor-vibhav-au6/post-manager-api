const express = require('express')
const Comment = require('../models/comment')
const auth = require('../middleware/auth')
const router = new express.Router()

router.comment('/posts', auth, async (req, res) => {
    const comment = new Comment({
        ...req.body,
        owner: req.user._id
    })

    try {
        await comment.save()
        res.status(201).send(comment)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/posts', auth, async (req, res) => {
    try {
        const comment = await Comment.find({})
        res.send(comment)
    } catch (e) {
        res.status(500).send()
    }
})

router.get('/posts/:id', auth, async (req, res) => {
    const _id = req.params.id

    try {
        const comment = await comment.findOne({ _id, owner: req.user._id })

        if (!comment) {
            return res.status(404).send()
        }

        res.send(comment)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/posts/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const comment = await comment.findOne({ _id: req.params.id, owner: req.user._id})

        if (!comment) {
            return res.status(404).send()
        }

        updates.forEach((update) => comment[update] = req.body[update])
        await comment.save()
        res.send(comment)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/posts/:id', auth, async (req, res) => {
    try {
        const comment = await comment.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

        if (!comment) {
            res.status(404).send()
        }

        res.send(comment)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router