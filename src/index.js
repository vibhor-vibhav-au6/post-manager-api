const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const postRouter = require('./routers/post')
const commentRouter = require('./routers/comment')

const app = express()
const port = process.env.PORT || 3001



app.use(express.json())
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });
app.use(userRouter)
app.use(postRouter)
app.use(commentRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

