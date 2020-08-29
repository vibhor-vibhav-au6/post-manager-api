const express = require("express");
const Post = require("../models/post");
const auth = require("../middleware/auth");
const router = new express.Router();

router.post("/posts", auth, async (req, res) => {
  const post = new Post({
    ...req.body,
    author: req.user._id,
  });

  try {
    await post.save();
    res.status(201).send(post);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/posts", async (req, res) => {
  try {
    const post = await Post.find({});
    res.send(post);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/posts/:id", auth, async (req, res) => {
  const _id = req.params.id;
  // console.log(req)
  try {
    const post = await Post.findOne({ _id, author: req.user._id });

    if (!post) {
      return res.status(404).send();
    }

    res.send(post);
  } catch (e) {
    res.status(500).send();
  }
});

// router.patch('/posts/:id', auth, async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['description', 'title']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//     try {
//         const post = await post.findOne({ _id: req.params.id, author: req.user._id})

//         if (!post) {
//             return res.status(404).send()
//         }

//         updates.forEach((update) => post[update] = req.body[update])
//         await post.save()
//         res.send(post)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

router.delete("/posts/:id", auth, async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      author: req.user._id,
    });

    if (!post) {
      res.status(404).send();
    }

    res.send(post);
  } catch (e) {
    res.status(500).send();
  }
});

router.post("/post/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById({ _id: req.params.id });
    if (!post) {
      res.status(404).send();
    }
    likes = [...post.like, req.user._id];
    await Post.findByIdAndUpdate(req.params.id, { like: likes });
    res.send(typeof likes);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
